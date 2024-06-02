name = "Sagar Patil"

import os
from shutil import rmtree
import argparse

from jinja2 import Environment, FileSystemLoader, select_autoescape
import mistune, frontmatter

parser = argparse.ArgumentParser(description="Build the website")
parser.add_argument("--output", help="Output directory", default="dist")

args = parser.parse_args()

script_path = os.path.dirname(os.path.realpath(__file__))

env = Environment(
    loader=FileSystemLoader(f"{script_path}/templates"),
    autoescape=select_autoescape(["html"]),
)

# delete everything inside the output directory
for root, dirs, files in os.walk(args.output):
    for file in files:
        if file == "index.css":
            continue
        os.remove(os.path.join(root, file))

    for dir in dirs:
        rmtree(os.path.join(root, dir))


def write_output(content, *path):
    # make sure every directory in the path exists
    for i in range(len(path) - 1):
        if not os.path.exists(os.path.join(args.output, *path[: i + 1])):
            os.makedirs(os.path.join(args.output, *path[: i + 1]))

    with open(os.path.join(args.output, *path), "w") as f:
        f.write(content)


def get_post(folder, file):
    obj = frontmatter.load(f"posts/{folder}/{file}")
    html = mistune.html(obj.content)

    obj.content = html
    obj['slug'] = file.replace(".md", "")
    obj['href'] = f"/{folder}/{obj['slug']}"

    if 'order' not in obj:
        obj['order'] = 0

    return obj


def render_post(folder, post):
    template = env.get_template(f"posts/{folder}/page.html")
    return template.render(post=post, title=f"{post['title']} | {name}", name=name)


def render_post_list(folder, posts):
    template = env.get_template(f"posts/{folder}/list.html")
    return template.render(posts=posts)


post_folders = [f for f in os.listdir("posts") if os.path.isdir(f"posts/{f}")]
lists = {}

for post_folder in post_folders:
    post_files = os.listdir(f"posts/{post_folder}")
    posts = [get_post(post_folder, f) for f in post_files]
    posts = sorted(posts, key=lambda x: x['order'])

    for post in posts:
        write_output(render_post(post_folder, post), post_folder, f"{post['slug']}.html")

    lists[post_folder] = render_post_list(post_folder, posts)


index = env.get_template("index.html")

write_output(index.render(lists=lists, name=name, title=name), "index.html")
