import { FaLinkedinIn } from "react-icons/fa";
import { OutlineButton } from "./button";
import { TbBrandGithubFilled } from "react-icons/tb";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import Fieldset from "./fieldset";

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

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <main
      className={`flex min-h-screen flex-col max-w-5xl mx-auto px-4 py-4 sm:py-8 leading-5 dark:bg-black dark:text-white ${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans`}
    >
      <div className="flex justify-between flex-wrap">
        <Link href="/">
          <h3 className="font-mono">Sagar Patil</h3>
        </Link>
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
        </div>
      </div>
      <hr className="my-2 border-gray-500" />
      {children}
      <Fieldset title="About this site">
        <div className="flex flex-row justify-between">
          <span className="prose dark:prose-invert">
            Source code on{" "}
            <Link href="https://github.com/sagarreddypatil/portfolio-website">
              GitHub
            </Link>
          </span>
          <span>Copyright 2023 Sagar Patil</span>
        </div>
      </Fieldset>
    </main>
  );
}
