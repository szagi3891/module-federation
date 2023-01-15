import createCache from "@emotion/cache";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { registerNetworRequest, whenIddle } from "./utils/Idle";

const createJsx = (setBodyFlag: boolean): React.ReactElement => {
    const cssContainer = document.createElement('div');

    const myCache = createCache({
        key: setBodyFlag ? 'emotion-fake' : 'emotion-client',
        container: cssContainer
    });

    const setBody = (body: HTMLElement | null) => {
        if (body !== null) {
            console.info('!!!!! add container');
            body.appendChild(cssContainer);
        }
    };

    return <App setBody={setBodyFlag ? setBody : undefined} myCache={myCache} />
};
    
const fakeRoot = ReactDOM.createRoot(document.createElement('div'));
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

// .hydrateRoot(document.documentElement, jsx, {
//     onRecoverableError: (error) => {
//         console.info('Przechwycony komunikat o błędzie', error);
//     }
// });
// .createRoot(root).render(<App />)



//TODO - zrobić test, spróbować wyrenderować <App/> z jakimś lazy-loadingiem, i sprawdzić w jakiej formie wygeneruje się wynikowy html

//TODO - trzeba zastanowić się jakie wersje bibliotek są potrzebne w websie, react + mobx

//TODO - Gdy rzucany jest wyjątek w renderze. Co się dzieje w mobx ? Czy wycieka wtedy subskrybcja ?

//TODO - zbadać temat: https://github.com/mobxjs/mobx/issues/2526

// <React.StrictMode>
// </React.StrictMode>
