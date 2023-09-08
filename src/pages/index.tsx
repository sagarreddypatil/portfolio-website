import { PostType, getAllPosts } from "@/lib/api";

import Link from "next/link";
import Layout from "@/components/layout";

type CardProps = {
  slug: string;
  coverSrc: string;
  title: string;
  summary: string;
};

function Card(props: CardProps) {
  return (
    <Link href={`/posts/${props.slug}`}>
      <div className="rounded-none outline outline-1 outline-black hover:bg-black hover:text-white overflow-hidden me-[6px] mb-[6px] shadow-[5px_5px_0px_1px_rgba(0,0,0,0.5)]">
        <img
          className="w-full"
          src={props.coverSrc}
          alt={`Image for ${props.title}`}
        />
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
    <Layout>
      <fieldset className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-solid border-black p-4 pt-2">
        <legend>
          <h2 className="mx-2">Projects</h2>
        </legend>
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
      </fieldset>
    </Layout>
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
