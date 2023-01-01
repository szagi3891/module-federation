import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import React, { Suspense } from "react";

const timeout = (time: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};

const AppHeader = React.lazy(async () => {
    console.info("AppHeader - rozpoczynam ładowanie");
    await timeout(5000);
    console.info("AppHeader - rozpoczynam ładowanie");
    return import('./AppHeader');
});

const AppFooter = React.lazy(async () => {
    console.info("AppFooter - rozpoczynam ładowanie");
    await timeout(5000);
    console.info("AppFooter - rozpoczynam ładowanie");
    return import('./AppFooter');
});


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
}

export const App = observer(() => {
    const [state] = React.useState(() => new State());

    return (
        <div>
            <div onClick={state.triggerShow}>to jest App ... --- pokaz</div>
            { state.show ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <AppHeader />
                </Suspense>
            ) : (
                <div>
                    hide ...
                </div>
            )}
            <div onClick={state.counterUp}>tutaj jest jakis licznik = {state.counter}</div>
            <Suspense fallback={<div>Loading...</div>}>
                <AppFooter />
            </Suspense>
        </div>
    );
});
