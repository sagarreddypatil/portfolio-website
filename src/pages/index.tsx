import { OutlineButton } from "@/components/button";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaLinkedinIn } from "react-icons/fa";

import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function Card() {
  return (
    <div className="rounded-none outline outline-1 outline-black hover:bg-black hover:text-white overflow-hidden me-[6px] mb-[6px] shadow-[5px_5px_0px_1px_rgba(0,0,0,0.5)]">
      <img
        className="w-full"
        src="https://v1.tailwindcss.com/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 leading-6">
          Man made horrors beyond comprehension
        </div>
        <p>And probably one of the coolest projects you've ever seen</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col max-w-5xl mx-auto px-4 py-4 sm:py-8 leading-5 dark:bg-black dark:text-white ${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans`}
    >
      <div className="flex justify-between flex-wrap">
        <h3 className="font-mono">Sagar Patil</h3>
        <div className="flex flex-col sm:flex-row justify-between gap-2 align-middle items-center my-1">
          <OutlineButton
            href="https://linkedin.com/in/patilsr"
            className="w-32"
          >
            <FaLinkedinIn />
            <span className="ms-1">LinkedIn</span>
          </OutlineButton>
          <OutlineButton
            href="https://github.com/sagarreddypatil"
            className="w-32"
          >
            <TbBrandGithubFilled />
            <span className="ms-1">GitHub</span>
          </OutlineButton>
          <OutlineButton href="" className="w-32">
            <span className="ms-1">Resumé</span>
          </OutlineButton>
        </div>
      </div>
      <hr className="my-2 border-gray-500" />
      <fieldset className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-solid border-black p-4 pt-2">
        <legend>
          <h2 className="mx-2">Projects</h2>
        </legend>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </fieldset>
    </main>
  );
}
