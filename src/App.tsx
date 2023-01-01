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
    await timeout(2000);
    console.info("AppHeader - rozpoczynam ładowanie");
    return import('./AppHeader');
});

const AppFooter = React.lazy(async () => {
    console.info("AppFooter - rozpoczynam ładowanie");
    await timeout(2000);
    console.info("AppFooter - rozpoczynam ładowanie");
    return import('./AppFooter');
});


class State {
    @observable show: boolean = false;

    public triggerShow = () => {
        console.info('trigger show');

        this.show = true;
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
            ) : null }
            <Suspense fallback={<div>Loading...</div>}>
                <AppFooter />
            </Suspense>
        </div>
    );
});
