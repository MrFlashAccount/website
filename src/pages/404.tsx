import * as React from "react";
import { CssBaseline } from "../components";

const NotFoundPage = () => {
  return (
    <main className="max-w-screen-md mx-auto pl-8 pr-8 pb-8">
      <CssBaseline />
      <title>Not found</title>

      <h1 className="font-semibold md:text-5xl text-center text-4xl text-gray-800 pt-8 pb-8">
        Page not found 🙀
      </h1>
    </main>
  );
};

export default NotFoundPage;
