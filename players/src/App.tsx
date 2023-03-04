import React from "react";
import { observer } from "mobx-react-lite";
import { Players } from "./components/Players";
import { AppStateProvider } from "./state/appState";
import { AppState } from "./state/appState";

export interface AppInitPropsTypes {
  getState: () => AppState
}

const App = observer((props: AppInitPropsTypes) => {

  return (
    <AppStateProvider value={props.getState()}>
      <Players />
    </AppStateProvider>
  )
});

export default App;