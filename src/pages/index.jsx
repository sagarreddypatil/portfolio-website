import * as React from "react";

import Layout from "./components/layout";
import Title from "./components/title";
import sr71 from "../../static/images/sr71.jpg";

export default function Home() {
  return (
    <Layout>
      <Title>Sagar Patil</Title>
      <img src={sr71} />
    </Layout>
  );
}
