import React, { useEffect } from "react"; // Correção aqui
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/components");
  }, [router]);

  return null;
};

export default Index;
