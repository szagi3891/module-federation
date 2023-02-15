import createCache from "@emotion/cache";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { registerNetworRequest, whenIddle } from "./utils/Idle";

const createJsx = (setBody: boolean): React.ReactElement => {
    const cssContainer = document.createElement('div');

    const myCache = createCache({
        key: setBody ? 'emotion-fake' : 'emotion-client',
        container: cssContainer
    });

    const setBodyFn = setBody ? (body: HTMLElement | null) => {
        if (body !== null) {
            console.info('!!!!! add container');
            body.appendChild(cssContainer);
        }
    } : undefined;

    const driver = {
        isBrowser: () => true,
    };

    return <App driver={driver} setBody={setBodyFn} myCache={myCache} />
};
    
const fakeRoot = ReactDOM.createRoot(document.createElement('html'));
fakeRoot.render(createJsx(false));
console.info('render fake');

const unregister = registerNetworRequest();

setTimeout(() => {
    unregister();
}, 500);

whenIddle(() => {
    console.info('!!!!! render normal app');
    ReactDOM.createRoot(document.documentElement).render(createJsx(true));
    fakeRoot.unmount();
});

//TODO - przekazywać funkcję zwrotną do App, za pomocą której aplikacja będzie mogła pobrać obecnego urla na którym się znajduje
//TODO - zorbić podobnie z pushHistory oraz z hitoryChange callbackiem ? Zrobić coś w rodzaju wirtualnego drivera do środowiska

//TODO - trzeba zastanowić się jakie wersje bibliotek są potrzebne w websie, react + mobx

//TODO - zbadać temat: https://github.com/mobxjs/mobx/issues/2526
