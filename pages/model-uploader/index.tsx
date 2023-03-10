import Head from "next/head";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Mesh } from "three";

import { inter } from "../../styles/fonts";
import { ISelectedMesh, States } from "../../types";
import Modal from "../../components/Modal";
import ModelLoaderScene from "../../3D/ModelLoaderScene";

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
        <title>MODEL LOADER ♟️</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>♟️</text></svg>"
        />
      </Head>
      <main className={inter.className}>
        <Canvas>
          <ModelLoaderScene
            modelURL={modelURL}
            setAvailableMeshes={setAvailableMeshes}
            setAppState={setAppState}
            selectedMeshes={selectedMeshes}
          />
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
