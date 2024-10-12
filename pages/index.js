import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTheme } from "../componentes/ThemeProvider/ThemeProvider";

const Index = () => {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <>
      <div>
        <button onClick={toggleDarkMode}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </>
  );
};

export default Index;
