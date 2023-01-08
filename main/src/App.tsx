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

    //TODO - co jeśli fallback, będzie uzywał withConfig ? Pierwszy mechanizm hydracji, powinien równie poczekać na gotowość tego elementu. Trzeba to jakoś sprawdzić lub znaleźć sposób jak to ograć

    return (
        <div>
            <Suspense fallback={<div>Loading ...</div>}>
                { state.show ? (
                    <AppHeaderWrapper />
                ) : (
                    <div onClick={state.triggerShow}>
                        --- header ukryty - kliknij zeby pokazac ---
                    </div>
                )}
                <div onClick={state.counterUp}>tutaj jest jakis licznik = {state.counter}</div>
                <List />
            
                <AppFooter label="testowy label" />
                <LazyParallel />
            </Suspense>
        </div>
    );
});
