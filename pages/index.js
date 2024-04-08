import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head"; // Importar o Head de next/head

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // Correção no caminho
  }, [router]);

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="UvuKX1cPOo1fakawbq5Ry3zxnRuJdHQPdfHTLn4pXGY" />
      </Head>
    </>
  );
};

export default Index;
