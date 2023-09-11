import Article from "@/components/article";
import Fieldset from "@/components/fieldset";
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

  const articleClasses =
    "prose md:prose-lg lg:prose-xl max-w-none prose-neutral dark:prose-invert";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <Fieldset title={`cat ~/${post.slug}.md`}>
          <Article>
            <h1 className="!mb-1">{post.title}</h1>
            <em>{post.summary}</em>
            <div className="h-4" />
          </Article>
          <img src={post.coverImage} className="mb-4"></img>
          <article
            className={articleClasses}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Fieldset>
      </Layout>
    </>
  );
}

async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, {
      allowDangerousHtml: true,
      allowDangerousCharacters: true,
      sanitize: false,
    })
    .process(markdown);
  return result.toString();
}

type Params = {
  params: {
    slug: string[];
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug.join("/"));
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
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug.split("/"),
        },
      };
    }),
    fallback: false,
  };
}
