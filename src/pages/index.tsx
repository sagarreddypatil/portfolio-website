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
            className="object-cover object-left-top w-full aspect-[3/2]"
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
        <div className="flex flex-col gap-4">
          <Fieldset title="ls ~/projects">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {allPosts.map((post) => {
                return (
                  <Card
                    slug={post.slug}
                    title={post.title}
                    summary={post.summary}
                    coverSrc={post.coverImage}
                    key={post.slug}
                  />
                );
              })}
            </div>
          </Fieldset>
          <WhoAmI />
        </div>
      </Layout>
    </>
  );
}

function WhoAmI() {
  const bday = new Date(2003, 12, 30);
  const ageDate = new Date(Date.now() - bday.getTime());
  const age = Math.floor(ageDate.getTime() / 3.154e10);

  return (
    <Fieldset title="whoami">
      <article className="flex flex-col gap-3 text-lg">
        <p>
          Hi there! I am a {age} y/o student at Purdue University majoring in
          Computer Science. I like rockets and computers. Some of my hobbies
          include photography, reading sci-fi, and climbing (don't ask me my
          grade)
        </p>
        <p>Here's a photo of me in front of an SR-71</p>
        <img src="/assets/me.jpg" alt="me in front of an sr-71" />
      </article>
    </Fieldset>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
};
