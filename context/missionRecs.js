import {
  createContext, useContext, useState, useMemo,
} from "react";

const Context = createContext();

export function MissionRecsProvider({ children }) {
  const [missionRecs, setMissionRecs] = useState([]);
  return (
    // eslint-disable-next-line max-len
    <Context.Provider value={[missionRecs, setMissionRecs]}>{children}</Context.Provider>
  );
}

export function useMissionRecsContext() {
  return useContext(Context);
}
