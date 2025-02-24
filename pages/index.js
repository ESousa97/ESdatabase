import React from "react";
import Head from "next/head";
import { useTheme } from "../componentes/ThemeProvider/ThemeProvider";

const Index = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="UvuKX1cPOo1fakawbq5Ry3zxnRuJdHQPdfHTLn4pXGY" />
      </Head>
      <div>
        <button onClick={toggleDarkMode}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </>
  );
};

export default Index;
