import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { ShaderMaterial } from "three";
import { IChessPieces } from "../../types";
import Lights from "../Lights";

const ChessPieces = ({}: IChessPieces) => {
  const { scene, materials } = useGLTF("/models/chess.glb");

  return <mesh></mesh>;
};

const EditorScene = (props: IChessPieces) => {
  return (
    <>
      <Suspense>
        <ChessPieces {...props} />
      </Suspense>
      <OrbitControls />
      <Lights />
    </>
  );
};

export default EditorScene;
