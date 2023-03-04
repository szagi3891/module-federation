import React from "react";
import { observer } from "mobx-react-lite";
import { useAppStateContext } from "../state/appState";

export const Players = observer(() => {
  const { isAuthorized, onLogin, onLogout, from } = useAppStateContext();

  return (
    <div>
      <h1>PLAYERS - {from}</h1>
      <div>User is {isAuthorized ? 'logged' : 'unknown'}</div>
      {isAuthorized ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <button onClick={onLogin}>Login</button>
      )}
    </div>
  );
})
