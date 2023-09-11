// from https://github.com/vercel/next.js/tree/canary/examples/blog-starter

import fs from "fs";
import { globSync } from "glob";
import { join } from "path";
import matter from "gray-matter";

const postsDir = join(process.cwd(), "posts");

export function getPostSlugs() {
  return globSync(`${postsDir}/**/*.md`).map((file) => {
    // remove postsDir
    const slug = file.split(postsDir)[1].slice(1);
    return slug;
  });
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {
    slug: realSlug,
    content,
    ...data,
  };

  return items;
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // i guess all posts have the "order" field?
    .sort((p1, p2) => (p1.order > p2.order ? 1 : -1));

  return posts;
}

export type PostType = {
  slug: string;
  title: string;
  order: number;
  coverImage: string;
  summary: string;
  content: string;
};
