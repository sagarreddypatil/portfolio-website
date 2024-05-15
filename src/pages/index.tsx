import { PostType, getAllPosts } from "@/lib/api";

import Link from "next/link";
import Layout from "@/components/layout";
import Fieldset from "@/components/fieldset";
import Head from "next/head";
import Article from "@/components/article";

export const config = {
  unstable_runtimeJS: false,
};

type CardProps = {
  slug: string;
  coverSrc: string;
  title: string;
  summary: string;
};

function Card(props: CardProps) {
  return (
    <Link href={`/${props.slug}`}>
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
        <title>Sagar Patil</title>
      </Head>
      <Layout>
        <div className="flex flex-col gap-4">
          <WhoAmI />
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
          <Friends />
          <Coursework />
        </div>
      </Layout>
    </>
  );
}

function WhoAmI() {
  const bday = new Date("2003-12-30");
  const ageInMs = Date.now() - bday.getTime();
  const age = Math.floor(ageInMs / 31556952000);

  return (
    <Fieldset title="whoami">
      <article className="flex flex-col gap-3 text-lg">
        <p>
          Hi there! I am a {age} y/o student at Purdue University majoring in
          Computer Science. I like rockets and computers. Some of my hobbies
          include photography, reading sci-fi, 3d printing, software defined
          radio, and climbing
        </p>
        <p>
          Here's a photo of me in front of an SR-71 (and Space Shuttle
          Discovery)
        </p>
        <img
          src="/assets/me.jpg"
          alt="me in front of an sr-71"
          className="h-[350px] object-cover"
        />
      </article>
    </Fieldset>
  );
}

function Coursework() {
  return (
    <Fieldset title="~/coursework/readme.md">
      <Article>
        <h4>Fall 2021</h4>
        <ul>
          <li>CS 18000 - Problem Solving and Object-Oriented Programming</li>
          <li>MA 26100 - Multivariate Calculus</li>
        </ul>
        <h4>Spring 2021</h4>
        <ul>
          <li>CS 18200 - Discrete Mathamatics</li>
          <li>CS 24000 - Programming in C</li>
        </ul>
        <h4>Fall 2022</h4>
        <ul>
          <li>CS 25000 - Computer Architecture</li>
          <li>CS 25100 - Data Structures and Algorithms</li>
        </ul>
        <h4>Spring 2022</h4>
        <ul>
          <li>CS 25200 - Systems Programming</li>
          <li>CS 47100 - Intro to Artificial Intelligence</li>
        </ul>
        <h4>Fall 2023</h4>
        <ul>
          <li>CS 37300 - Data Mining & Machine Learning</li>
          <li>CS 38100 - Intro to Analysis of Algorithms</li>
        </ul>
        <h4>Spring 2024</h4>
        <ul>
          <li>CS 35200 - Compilers: Principles and Practice</li>
          <li>CS 35400 - Operating Systems</li>
          <li>CS 45600 - Programming Languages</li>
        </ul>
      </Article>
    </Fieldset>
  );
}

function Friends() {
  return (
    <Fieldset title="~/friends.md">
      <Article>
        Cool friends working on cool stuff
        <ul>
          <li><a href="https://arefmalek.com/">Aref Malek</a></li>
          <li><a href="https://coleroberts.dev/index">Cole Roberts</a></li>
          <li><a href="https://harmya.me/">Harmya Bhatt</a></li>
          <li><a href="https://bhavesh.dev/about">Bhavesh</a></li>
          <li><a href="https://www.zietek.dev/">Jacob Zietek</a></li>
          <li><a href="https://jinen.setpal.net/">Jinen Setpal</a></li>
          <li><a href="https://mikail-khan.com/">Mikail Khan</a></li>
          <li><a href="https://wade.dev/">Nicholas Wade</a></li>
        </ul>
      </Article>
    </Fieldset>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
};
