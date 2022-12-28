import Head from "next/head";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Mesh } from "three";
import { inter } from "../styles/fonts";
import { ISelectedMesh, States } from "../types";
import EditorScene from "../3D/EditorScene";
import Nav from "../components/Nav";
import ToolBar from "../components/ToolBar";
import s from "../styles/Home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>PAWN BUILDER ♟️</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>♟️</text></svg>"
        />
      </Head>
      <main className={inter.className}>
        <div className={s.main}>
          <Canvas>{/* <EditorScene /> */}</Canvas>
          <ToolBar />
          <Nav
            metabarContent={
              <p>
                ▧ WarGames: FAR’s first Open Edition is live. You can collect it
                here:{" "}
                <a href="http://app.manifold.xyz/c/WarGames">
                  http://app.manifold.xyz/c/WarGames
                </a>{" "}
                → Mint price 0.05ETH → Minting is available till the end of
                2022. → What’s next: Experimental participatory Generative Art
                project. More details soon! ▧
              </p>
            }
          />
        </div>
      </main>
    </>
  );
}
