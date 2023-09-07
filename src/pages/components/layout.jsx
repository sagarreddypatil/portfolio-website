import React from "react";

export default function Layout({ children }) {
  return (
    <main className="2xl:mx-96 xl:mx-64 mx-0 flex flex-col">{children}</main>
  );
}
