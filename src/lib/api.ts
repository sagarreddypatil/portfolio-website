// from https://github.com/vercel/next.js/tree/canary/examples/blog-starter

import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDir = join(process.cwd(), "posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDir);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
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
