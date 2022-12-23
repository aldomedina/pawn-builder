import s from "./style.module.scss";
import { ISelectedMesh, States } from "../../types";
import { AnimatePresence } from "framer-motion";
import { Mesh } from "three";
import { useState } from "react";

const UploadModel: React.FC<{
  setModelURL: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setModelURL }) => {
  return (
    <div>
      <input
        type="file"
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          //@ts-ignore
          if (ev.target.files.length > 0) {
            //@ts-ignore
            const file = URL.createObjectURL(ev.target.files[0]);
            setModelURL(file);
          }
        }}
      />
    </div>
  );
};

const Selecting: React.FC<{
  availableMeshes: Mesh[];
  setSelectedMeshes: React.Dispatch<React.SetStateAction<ISelectedMesh[]>>;
  setAppState: React.Dispatch<React.SetStateAction<States>>;
}> = ({ availableMeshes, setSelectedMeshes, setAppState }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [formatedSelected, setFormatedSelect] = useState<ISelectedMesh[]>([]);
  return (
    <div className={s.selecting}>
      {availableMeshes.map((el) => (
        <div className={s.mesh} key={el.name}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div>{el.name}</div>
            <input
              type="checkbox"
              checked={selected?.includes(el.name)}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (selected.includes(el.name)) {
                  setSelected((s) => s.filter((e) => e !== el.name));
                }
                setSelected((s) => [...s, el.name]);
              }}
            />
          </div>
          <div>
            {selected?.includes(el.name) && (
              <select
                onChange={(e) => {
                  if (
                    formatedSelected.findIndex(
                      (e) => e.mesh.name === el.name
                    ) >= 0
                  ) {
                    setFormatedSelect((s) =>
                      s.filter((e) => e.mesh.name !== el.name)
                    );
                  }
                  // @ts-ignore
                  setFormatedSelect((s) => [
                    ...s,
                    { material: e.target.value, mesh: el },
                  ]);
                }}
              >
                <option disabled selected>
                  {" "}
                  -- select a material --{" "}
                </option>
                <option value={"standard"}>standard</option>
                <option value={"wireframe"}>wireframe</option>
                <option value={"shader"}>shader</option>
              </select>
            )}
          </div>
        </div>
      ))}
      <button
        className={s.button}
        disabled={!formatedSelected.length}
        onClick={() => {
          setSelectedMeshes(formatedSelected);
          setAppState("display");
        }}
      >
        CREATE
      </button>
    </div>
  );
};

const Modal: React.FC<{
  isOpen: boolean;
  appState: States;
  setAppState: React.Dispatch<React.SetStateAction<States>>;
  setModelURL: React.Dispatch<React.SetStateAction<string>>;
  availableMeshes: Mesh[];
  setSelectedMeshes: React.Dispatch<React.SetStateAction<ISelectedMesh[]>>;
}> = ({
  isOpen,
  setAppState,
  appState,
  setModelURL,
  availableMeshes,
  setSelectedMeshes,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={s.wrapper}>
          <div className={s.modal}>
            {appState === "init" && <UploadModel setModelURL={setModelURL} />}
            {appState === "selecting" && (
              <Selecting
                availableMeshes={availableMeshes}
                setSelectedMeshes={setSelectedMeshes}
                setAppState={setAppState}
              />
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
