import { OrbitControls } from "@react-three/drei";
import React from "react";
import { Mesh } from "three";
import { ISelectedMesh, States } from "../../types";
import Lights from "../Lights";
import ModelDisplayer from "./ModelDisplayer";
import ModelLoader from "./ModelLoader";

interface IModelLoaderScene {
  modelURL: string;
  setAvailableMeshes: React.Dispatch<React.SetStateAction<Mesh[]>>;
  setAppState: React.Dispatch<React.SetStateAction<States>>;
  selectedMeshes: ISelectedMesh[];
}

const ModelLoaderScene = ({
  modelURL,
  setAvailableMeshes,
  setAppState,
  selectedMeshes,
}: IModelLoaderScene) => {
  return (
    <>
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
    </>
  );
};

export default ModelLoaderScene;
