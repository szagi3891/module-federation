import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

const root = document.getElementById("root");

if (root === null) {
    console.error('Brak root');
} else {
    const jsx = (
        // <React.StrictMode>
            <App />
        // </React.StrictMode>
    );

    ReactDOM
        .hydrateRoot(root, jsx, {
            onRecoverableError: (error) => {
                console.info('Przechwycony komunikat o błędzie', error);
            }
        });
        // .createRoot(root).render(<App />)
    ;
    // ReactDOM.render(<App />, root);
}

//TODO - zrobić test, spróbować wyrenderować <App/> z jakimś lazy-loadingiem, i sprawdzić w jakiej formie wygeneruje się wynikowy html

//TODO - trzeba zastanowić się jakie wersje bibliotek są potrzebne w websie, react + mobx

//TODO - Gdy rzucany jest wyjątek w renderze. Co się dzieje w mobx ? Czy wycieka wtedy subskrybcja ?

//TODO - zbadać temat: https://github.com/mobxjs/mobx/issues/2526
