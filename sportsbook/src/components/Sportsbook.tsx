import React from "react";
import { observer } from "mobx-react-lite";
import { useAppStateContext } from "../state/appState";

export const Sportsbook = observer(() => {
  const { isAutorized } = useAppStateContext();

  return (
    <div>
      <h1>SPORTSBOOK</h1>

      <div>-----------</div>
      <div>From players domain</div>
      <div>isAutorized - {isAutorized ? 'true' : 'false'}</div>
      <div>-----------</div>

      {isAutorized ? (
        <div>
          <button>Now you can place bet</button>
        </div>
      ) : (
        <div>Please login in players to place bet</div>
      )}

    </div>
  );
})
