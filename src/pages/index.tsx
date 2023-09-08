import { PostType, getAllPosts } from "@/lib/api";

import Link from "next/link";
import Layout from "@/components/layout";
import Fieldset from "@/components/fieldset";
import Head from "next/head";

type CardProps = {
  slug: string;
  coverSrc: string;
  title: string;
  summary: string;
};

function Card(props: CardProps) {
  return (
    <Link href={`/posts/${props.slug}`}>
      <div className="rounded-none outline outline-1 outline-black dark:outline-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black overflow-hidden me-[6px] mb-[6px] shadow-[5px_5px_0px_1px_rgba(0,0,0,0.5)] dark:shadow-[5px_5px_0px_1px_rgba(255,255,255,0.25)]">
        <div className="w-full">
          <img
            className="object-cover object-left w-full aspect-[3/2]"
            src={props.coverSrc}
            alt={`Image for ${props.title}`}
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 leading-6">{props.title}</div>
          <p>{props.summary}</p>
        </div>
      </div>
    </Link>
  );
}

type Props = {
  allPosts: PostType[];
};

export default function Home({ allPosts }: Props) {
  return (
    <>
      <Head>
        <title>Sagar's Portfolio</title>
      </Head>
      <Layout>
        <Fieldset title="Projects">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {allPosts.map((post) => {
              return (
                <Card
                  slug={post.slug}
                  title={post.title}
                  summary={post.summary}
                  coverSrc={post.coverImage}
                />
              );
            })}
          </div>
        </Fieldset>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "order",
    "slug",
    "coverImage",
    "summary",
  ]);

  return {
    props: { allPosts },
  };
};
