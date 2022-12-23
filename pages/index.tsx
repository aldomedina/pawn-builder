import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import Lights from "../components/Lights";
import ModelLoader from "../components/ModelLoader";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Mesh } from "three";
import { inter } from "../styles/fonts";

import { ISelectedMesh, States } from "../types";
import Modal from "../components/Modal";
import ModelDisplayer from "../components/ModelDisplayer";

export default function Home() {
  const [appState, setAppState] = useState<States>("init");
  const [modelURL, setModelURL] = useState<string>("");
  const [availableMeshes, setAvailableMeshes] = useState<Mesh[]>([]);
  const [selectedMeshes, setSelectedMeshes] = useState<ISelectedMesh[]>([]);
  useEffect(() => {
    console.log(appState);
  }, [appState, selectedMeshes]);

  return (
    <>
      <Head>
        <title>PAWN BUILDER ♟️</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <Canvas>
          <OrbitControls />
          <Lights />
          {modelURL && (
            <ModelLoader
              url={modelURL}
              setAvailableMeshes={setAvailableMeshes}
              setAppState={setAppState}
            />
          )}
          {selectedMeshes && <ModelDisplayer SelectedMeshes={selectedMeshes} />}
        </Canvas>
        <Modal
          isOpen={["init", "selecting"].includes(appState)}
          appState={appState}
          setAppState={setAppState}
          setModelURL={setModelURL}
          availableMeshes={availableMeshes}
          setSelectedMeshes={setSelectedMeshes}
        ></Modal>
      </main>
    </>
  );
}
