import { observable, makeObservable } from "mobx";
import { observer } from "mobx-react-lite";
import React, { Suspense } from "react";
import { LazyParallel } from "./LazyParallel";
import List from './List';
import { timeout } from "./utils/timeout";

const USE_TIMEOUTS = false;

const AppHeader = React.lazy(async () => {
    console.info("AppHeader - rozpoczynam ładowanie");
    if (USE_TIMEOUTS) {
        await timeout(5000);
    }
    console.info("AppHeader - rozpoczynam ładowanie");
    return import('./AppHeader');
});

const AppFooter = React.lazy(async () => {
    console.info("AppFooter - rozpoczynam ładowanie");
    if (USE_TIMEOUTS) {
        await timeout(5000);
    }
    console.info("AppFooter - rozpoczynam ładowanie");
    return import('./AppFooter');
});

// const List = React.lazy(() => import('./List'));

const AppHeaderWrapper = () => {
    return (
        <Suspense fallback={<div>Loading app header ...</div>}>
            <AppHeader />
        </Suspense>
    );
};

class State {
    @observable show: boolean = false;
    @observable counter: number = 0;

    public triggerShow = () => {
        console.info('trigger show');

        this.show = true;
    }

    public counterUp = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.counter++;
    }

    constructor() {
        makeObservable(this);
    }
}

export const App = observer(() => {
    const [state] = React.useState(() => new State());

    console.info('Render APP');

    return (
        <div>
            <div onClick={state.triggerShow}>to jest App ... --- pokaz</div>
            { state.show ? (
                <AppHeaderWrapper />
            ) : (
                <div>
                    hide ...
                </div>
            )}
            <div onClick={state.counterUp}>tutaj jest jakis licznik = {state.counter}</div>
            <Suspense fallback={<div>Loading list ...</div>}>
                <Suspense fallback={<div>Loading list 2 ...</div>}>
                    <List />
                </Suspense>
            </Suspense>
            <Suspense fallback={<div>Loading app footer ...</div>}>
                <AppFooter label="testowy label" />
            </Suspense>
            <Suspense fallback={<div>Ładowanie równoległych komponentów ----- fallback </div>}>
                <LazyParallel />
            </Suspense>
        </div>
    );
});
