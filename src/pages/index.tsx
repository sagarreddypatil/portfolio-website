import { IBM_Plex_Sans } from "next/font/google";
import { OutlineButton } from "@/components/button";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaLinkedinIn } from "react-icons/fa";

const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: "500" });

function Card() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src="https://v1.tailwindcss.com/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col max-w-6xl mx-auto py-8 ${ibmPlexSans.className} leading-4 dark:bg-black dark:text-white`}
    >
      <div className="flex justify-between">
        <h3>Sagar Patil</h3>
        <div className="flex justify-between">
          <OutlineButton
            href="https://linkedin.com/in/patilsr"
            className="w-32"
          >
            <FaLinkedinIn />
            <span className="ms-1">LinkedIn</span>
          </OutlineButton>
          <div className="w-2"></div>
          <OutlineButton
            href="https://github.com/sagarreddypatil"
            className="w-32"
          >
            <TbBrandGithubFilled />
            <span className="ms-1">GitHub</span>
          </OutlineButton>
          <div className="w-2"></div>
          <OutlineButton href="" className="w-32">
            <span className="ms-1">Resumé</span>
          </OutlineButton>
        </div>
      </div>
      <hr className="mt-1 mb-4 border-gray-500" />
      <h2 className="underline underline-offset-4">Projects</h2>
      <div>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  );
}
