import os
from jinja2 import Environment, FileSystemLoader, select_autoescape
import argparse

parser = argparse.ArgumentParser(description='Build the website')
parser.add_argument("--output", help="Output directory", default="dist")

args = parser.parse_args()

script_path = os.path.dirname(os.path.realpath(__file__))

env = Environment(
    loader=FileSystemLoader(f"{script_path}/templates"),
    autoescape=select_autoescape(['html'])
)

index = env.get_template('index.html')

with open(f"{args.output}/index.html", "w") as f:
    f.write(index.render())
