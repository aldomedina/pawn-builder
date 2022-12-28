import Head from "next/head";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { DoubleSide, Mesh } from "three";
import { inter } from "../../styles/fonts";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Bunny = () => {
  const { scene } = useGLTF("/models/stanford_bunny.glb");
  const [bunnyMesh, setBunnyMesh] = useState<Mesh>();
  useEffect(() => {
    scene.traverse((obj) => {
      //@ts-ignore
      if (obj.type === "Mesh") setBunnyMesh(obj);
    });
  }, [scene]);
  return (
    <group>
      <mesh
        geometry={bunnyMesh?.geometry}
        position={[0, 0, 0]}
        scale={[0.999, 0.999, 0.999]}
      >
        <meshBasicMaterial color="#FD4811" side={DoubleSide} />
      </mesh>
      <mesh geometry={bunnyMesh?.geometry} position={[0, 0, 0]}>
        <meshBasicMaterial wireframe />
      </mesh>
    </group>
  );
};

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
        <Canvas>
          <OrbitControls />
          <color attach="background" args={["#FD4811"]} />
          <ambientLight intensity={10} />
          <Bunny />
        </Canvas>
      </main>
    </>
  );
}
