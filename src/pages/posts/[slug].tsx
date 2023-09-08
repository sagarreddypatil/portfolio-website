import Layout from "@/components/layout";
import { PostType, getAllPosts, getPostBySlug } from "@/lib/api";
import Head from "next/head";
import { remark } from "remark";
import html from "remark-html";

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  const title = `${post.title} | Sagar Patil`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <article
          className="prose lg:prose-lg xl:prose-xl max-w-full"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Layout>
    </>
  );
}

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
