import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { makeAutoObservable } from "mobx";
import { ErrorBoundary } from 'react-error-boundary';
import { appState, AppStateProvider, useAppStateContext } from "./state/appState";

// @ts-expect-error
const PlayersComponent = React.lazy(() => import('players/App'));
// @ts-expect-error
const SportsbookComponent = React.lazy(() => import('sportsbook/App'));

class State {

    test: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    onClick = () => {
        this.test = this.test + ' js ok'
    }
}



const PlayersComponentLoader = observer(() => {
    const { playersAppState } = useAppStateContext();

    if (playersAppState === null) {
        return null;
    }

    return (
        <React.Suspense>
            <ErrorBoundary fallback={<h2>Failed to load PlayersComponent</h2>}>
                <PlayersComponent getState={() => playersAppState} />
            </ErrorBoundary>
        </React.Suspense>
    )
});

const SportsbookComponentLoader = observer(() => {
    const { sportsbookAppState } = useAppStateContext();

    if (sportsbookAppState === null) {
        return null;
    }
    return (
        <React.Suspense>
            <ErrorBoundary fallback={<h2>Failed to load SportsbookComponent</h2>}>
                <SportsbookComponent getState={() => sportsbookAppState} />
            </ErrorBoundary>
        </React.Suspense>
    )
});

export const AppInner = observer(() => {
    const [state] = useState(() => new State());

    return (
        <div>
            <h1>HOME LAYOUT SHELL</h1>
            <div><button onClick={state.onClick}>Test js</button>{state.test}</div>
            <PlayersComponentLoader />
            <SportsbookComponentLoader />
        </div>
    )
});


export const App = observer(() => {

    return (
        <AppStateProvider value={appState}>
            <AppInner />
        </AppStateProvider>
    )
});
