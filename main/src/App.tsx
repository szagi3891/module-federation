import { CacheProvider, EmotionCache } from "@emotion/react";
import styled from "@emotion/styled";
import { observable, makeObservable, action } from "mobx";
import { observer } from "mobx-react-lite";
import React, { Suspense } from "react";
import { LazyParallel } from "./LazyParallel";
import List from './List';
import { ReactLazy } from "./utils/LazyComponent";
import { timeout } from "./utils/timeout";

const USE_TIMEOUTS = false;

const Body = styled('body')`
    background-color: green;
`;

const AppHeader = ReactLazy(async () => {
    console.info("AppHeader - rozpoczynam ładowanie");
    if (USE_TIMEOUTS) {
        await timeout(5000);
    }
    console.info("AppHeader - rozpoczynam ładowanie");
    return (await import('./AppHeader')).default;
});

const AppFooter = ReactLazy(async () => {
    console.info("AppFooter - rozpoczynam ładowanie");
    if (USE_TIMEOUTS) {
        await timeout(5000);
    }
    console.info("AppFooter - rozpoczynam ładowanie");
    let com = await import('./AppFooter');
    return com.default;
});

// const List = React.lazy(() => import('./List'));

const AppHeaderWrapper = () => {
    return (
        // <Suspense fallback={<div>Loading app header ...</div>}>
            <AppHeader />
        // </Suspense>
    );
};

class State {
    @observable show: boolean = false;
    @observable counter: number = 0;

    public triggerShow = () => {
        console.info('trigger show');

        this.show = true;
    }

    @action public counterUp = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.counter++;
    }

    constructor() {
        makeObservable(this);
    }
}

interface PropsType {
    myCache: EmotionCache,
    setBody?: (node: HTMLElement | null) => void,
    src?: string,
}

export const App = observer((props: PropsType) => {
    const [state] = React.useState(() => new State());

    const { myCache, setBody, src } = props;
    const script = src === undefined
        ? undefined
        : <script async data-chunk="main" src={src}></script>;

    console.info('Render APP');

    //TODO - co jeśli fallback, będzie uzywał withConfig ? Pierwszy mechanizm hydracji, powinien równie poczekać na gotowość tego elementu. Trzeba to jakoś sprawdzić lub znaleźć sposób jak to ograć

    return (
        <CacheProvider value={myCache}>
            <head>
                <title>{`Prototyp = test === counter = ${state.counter}`}</title>
            </head>
            <Body ref={setBody}>
                <Content state={state} />
                {script}
            </Body>
        </CacheProvider>
    );
});

interface ContentPropsType {
    state: State
}

const Content = observer((props: ContentPropsType) => {
    const { state } = props;

    return (
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
    );
})
