import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
// import { renderToNodeStream, renderToPipeableStream, renderToReadableStream, renderToString} from 'react-dom/server';

// class AAAA {
//     constructor(private readonly value: string) {
//     }

//     ccc = (arg: string) => {
//         console.info(`${this.value} odpalam ccc, arg=${arg}`);
//     }
// }

// const aaaa = new AAAA('zmienna prywatna');
// const ccc = aaaa.ccc;
// ccc('parametr jakis');

const root = document.getElementById("root");

if (root === null) {
    console.error('Brak root');
} else {
    ReactDOM.render(<App />, root);
}

//TODO - zrobić test, spróbować wyrenderować <App/> z jakimś lazy-loadingiem, i sprawdzić w jakiej formie wygeneruje się wynikowy html

//TODO - trzeba zastanowić się jakie wersje bibliotek są potrzebne w websie, react + mobx



// const { pipe } = renderToPipeableStream(<App />);

// const aaaa = await renderToReadableStream(<App />);

// pipe({
//     write: (...args) => {
//         console.info('write ... ', args);
//     },
//     end: (...args) => {
//         console.info('end ... ', args);
//     }
// });
