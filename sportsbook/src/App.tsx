import React from "react";
import { observer } from "mobx-react-lite";
import { Sportsbook } from "./components/Sportsbook";
import { AppStateProvider } from "./state/appState";
import { AppState } from "./state/appState";

export interface AppInitPropsTypes {
  getState: () => AppState
}

const App = observer((props: AppInitPropsTypes) => {

  return (
    <AppStateProvider value={props.getState()}>
      <Sportsbook />
    </AppStateProvider>
  )
});

export default App;