const Lights = () => {
  return (
    <>
      <rectAreaLight
        intensity={1.75}
        position={[0, 0, 4]}
        width={8}
        height={8}
      />
      <rectAreaLight
        intensity={1.75}
        position={[0, 0, -4]}
        width={8}
        height={8}
      />
      <spotLight
        penumbra={1}
        angle={0.2}
        castShadow
        position={[0, 20, 0]}
        intensity={0.2}
        shadow-mapSize={[512, 512]}
      />
      <spotLight position={[0, 0, 0]} />
    </>
  );
};

export default Lights;
