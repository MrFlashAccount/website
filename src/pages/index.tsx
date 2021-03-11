import React from "react";
import { Helmet } from "react-helmet";
import { CssBaseline, Link } from "../components";

const IndexPage = () => {
  return (
    <>
      <Helmet>
        <html lang="en" itemType="https://schema.org/Person" itemScope />
        <title>Sergey Garin</title>
        <link
          href="https://res.cloudinary.com/"
          crossOrigin="anonymous"
          rel="preconnect"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧑🏻‍💻</text></svg>"
        />
        <meta name="description" content="My contacts and cv" />
        <link itemProp="url" href="https://garin.dev" />
        <meta name="author" content="Sergey Garin" />
        <meta property="og:title" content="Sergey Garin" />
        <meta property="og:description" content="My contacts and cv" />
        <meta property="og:locale" content="en" />
        <meta property="og:site_name" content="Sergey Garin" />
      </Helmet>
      <CssBaseline />
      <div
        role="presentation"
        className="max-w-screen-md mx-auto pl-8 pr-8 pb-8"
      >
        <main>
          <div className="pt-16 pb-8 flex flex-col items-center text-center">
            <img
              className="w-24 md:w-48 rounded-full object-cover"
              height="32"
              width="32"
              alt=""
              role="presentation"
              srcSet="https://res.cloudinary.com/mrflashaccount/image/upload/ar_1:1,c_fill,g_auto,f_auto,q_auto,w_92,dpr_2.0/v1615478867/garin.dev/me.jpg 2x"
              src="https://res.cloudinary.com/mrflashaccount/image/upload/ar_1:1,c_fill,g_auto,f_auto,q_auto,w_192/v1615478867/garin.dev/me.jpg"
            />
            <h1 className="font-semibold md:text-5xl text-4xl text-gray-800 pt-8 pb-8">
              Hi! My name is{" "}
              <span role="presentation" className="text-blue-700">
                <span itemProp="familyName">Garin</span>{" "}
                <span itemProp="givenName">Sergey</span>.
              </span>{" "}
              <br />
              I'm a frontend developer.
            </h1>
          </div>

          <section className="md:mt-16 mt-8">
            <h2 className="text-4xl mb-6 text-center md:text-left">
              Get in touch
            </h2>
            <div>
              <p className="text-xl">
                Say{" "}
                <Link
                  href="https://t.me/mrflashaccount"
                  itemProp="sameAs"
                  rel="me"
                >
                  Hi!
                </Link>{" "}
                to me or find me on the other platforms:{" "}
                <Link
                  href="https://twitter.com/mrflashaccount"
                  itemProp="sameAs"
                  rel="me"
                >
                  twitter
                </Link>
                ,{" "}
                <Link
                  href="https://github.com/MrFlashAccount"
                  itemProp="sameAs"
                  rel="me"
                >
                  github
                </Link>{" "}
                or you can write me a lovely letter:{" "}
                <Link href="mailto:sergey@garin.dev" itemProp="email">
                  email
                </Link>
                <br />
                Peruse my{" "}
                <Link href="https://hh.ru/resume/958a7f6aff022a7d620039ed1f647643674c50?print=true">
                  résumé
                </Link>
              </p>
            </div>
          </section>
        </main>
        <footer className="block border-solid border-t border-blue-600 mt-10 pt-1">
          Site is under construction 🚧
        </footer>
      </div>
    </>
  );
};

export default IndexPage;
