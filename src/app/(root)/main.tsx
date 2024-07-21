"use client";
import dynamic from "next/dynamic";
import React from "react";

const Container = dynamic(() => import("@/components/common/Container"), {
  ssr: false,
});

interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default Main;
