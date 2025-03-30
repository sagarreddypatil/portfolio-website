import os
import argparse
from shutil import rmtree
from urllib.parse import urljoin

import mistune
import frontmatter
from bs4 import BeautifulSoup, element
from jinja2 import Environment, FileSystemLoader, select_autoescape

first_name = "Sagar"
last_name = "Patil"
name = f"{first_name} {last_name}"
domain = "sagarpatil.me"
generic_username = "sagarreddypatil"
twitter_username = f"@{generic_username}"
url = f"https://{domain}"  # for opengraph


def bs(content):
    return BeautifulSoup(content, "html.parser")


parser = argparse.ArgumentParser(description="Build the website")
parser.add_argument("--output", help="Output directory", default="dist")
parser.add_argument(
    "--no-clean", help="Don't clean the output directory", action="store_true"
)

args = parser.parse_args()

script_path = os.path.dirname(os.path.realpath(__file__))

env = Environment(
    loader=FileSystemLoader(f"{script_path}/templates"),
    autoescape=select_autoescape(["html"]),
)

if not args.no_clean:
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


make_html: mistune.Markdown = mistune.create_markdown(
    escape=False,
    plugins=["strikethrough", "footnotes", "table", "speedup", "math"],
)


def get_post(folder, file):
    obj = frontmatter.load(f"posts/{folder}/{file}")
    html = make_html(obj.content)

    obj.content = html
    obj["slug"] = file.replace(".md", "")
    obj["href"] = f"/{folder}/{obj['slug']}"

    if "order" not in obj:
        obj["order"] = 0

    return obj


def og_tags(data: dict):
    tags = []
    for key, value in data.items():
        tags.append(f'<meta property="og:{key}" content="{value}">')

    if "description" in data:
        tags.append(f'<meta name="description" content="{data["description"]}">')

    return tags


twitter_tags_common = {
    "domain": domain,
    "card": "summary_large_image",
    "site": twitter_username,
}


def twitter_tags(data: dict):
    lut = {
        "card": "name",
        "domain": "property",
        "url": "property",
        "title": "name",
        "description": "name",
        "image": "name",
        "site": "name",
    }

    data = {**twitter_tags_common, **data}

    tags = []
    for key, value in data.items():
        tags.append(f'<meta {lut[key]}="twitter:{key}" content="{value}">')

    return tags


def post_seotags(folder, post):
    items_common = {
        "url": urljoin(url, f"/{folder}/{post['slug']}"),
    }

    if "title" in post:
        items_common["title"] = f"{name} | {post['title']}"

    if "summary" in post:
        items_common["description"] = post["summary"]

    if "coverImage" in post:
        items_common["image"] = urljoin(url, post["coverImage"])

    items_og = {
        **items_common,
        "type": "website",
    }

    items_twitter = {
        **items_common,
        "card": "summary_large_image",
        "domain": domain,
    }

    return og_tags(items_og) + twitter_tags(items_twitter)


def render_post(folder, post):
    template = env.get_template(f"posts/{folder}/page.html")
    rendered = template.render(post=post, title=f"{name} | {post['title']}", name=name)

    soup = bs(rendered)
    og = post_seotags(folder, post)

    for item in og:
        soup.head.append(bs(item))

    return soup.encode_contents().decode("utf-8")


def render_post_list(folder, posts):
    template = env.get_template(f"posts/{folder}/list.html")
    return template.render(posts=posts)


post_folders = [f for f in os.listdir("posts") if os.path.isdir(f"posts/{f}")]
lists = {}

for post_folder in post_folders:
    post_files = os.listdir(f"posts/{post_folder}")
    posts = [get_post(post_folder, f) for f in post_files]
    posts = sorted(posts, key=lambda x: x["order"])

    for post in posts:
        write_output(
            render_post(post_folder, post), post_folder, f"{post['slug']}.html"
        )

    lists[post_folder] = render_post_list(post_folder, posts)


def img_tag_rule(img_tag: element.Tag):
    if not img_tag.has_attr("decoding"):
        img_tag["decoding"] = "async"
    if not img_tag.has_attr("loading"):
        img_tag["loading"] = "lazy"


seo_common = {
    "url": url,
    "title": name,
    "description": f"{name}'s personal website",
    "image": urljoin(url, "/assets/me-small.jpg"),
}

og = og_tags(
    {
        **seo_common,
        "type": "profile",
        "profile:first_name": first_name,
        "profile:last_name": last_name,
        "profile:username": generic_username,
    }
)

twitter = twitter_tags({**seo_common, "card": "summary"})
seotags = og + twitter

index = env.get_template("index.html")
rendered = index.render(lists=lists, name=name, title=name)
soup = bs(rendered)
for item in seotags:
    soup.head.append(bs(item))

for img_tag in soup.find_all("img"):
    img_tag_rule(img_tag)

write_output(soup.encode_contents().decode("utf-8"), "index.html")
