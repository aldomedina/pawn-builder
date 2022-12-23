import React, { Suspense, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { DoubleSide, Group, Mesh } from "three";
import { States } from "../../types";

interface IModelLoaderProps {
  url: string;
  setAvailableMeshes: React.Dispatch<React.SetStateAction<Mesh[]>>;
  setAppState: React.Dispatch<React.SetStateAction<States>>;
}

export default function ModelLoader({
  url,
  setAvailableMeshes,
  setAppState,
}: IModelLoaderProps) {
  const group = useRef<Group>(null);
  const { scene, materials } = useGLTF(url);
  useEffect(() => {
    if (scene) {
      const meshes: Mesh[] = [];
      scene.traverse((obj) => {
        //@ts-ignore
        if (obj.type === "Mesh") meshes.push(obj);
      });
      if (meshes) {
        setAvailableMeshes(meshes as Mesh[]);
        setAppState("selecting");
      }
    }
  }, [scene]);
  return null;
  // (
  //   <Suspense fallback={null}>
  //     <mesh
  //       //@ts-ignore
  //       geometry={nodes["Object_2"].geometry}
  //       scale={0.2}
  //     >
  //       <meshStandardMaterial color={"blue"} side={DoubleSide} />
  //     </mesh>
  //   </Suspense>
  // );
}
