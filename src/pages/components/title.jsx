import * as React from "react";

export default function Title({ children }) {
  return (
    <>
      <div className="flex flex-row justify-between mt-2">
        <span className="text-4xl font-bold">{children}</span>
      </div>
      <hr className="border-black my-2" />
    </>
  );
}
