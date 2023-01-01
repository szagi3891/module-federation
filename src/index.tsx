import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
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
    ReactDOM
        .hydrateRoot(root, <App />)
        // .createRoot(root).render(<App />)
    ;
    // ReactDOM.render(<App />, root);
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


/*

    pobieranie propsa pomiędzy storami

    getValue = ():  => {

        //import leniwy

        zwrócenie wartości

    }

*/




/*
obsługa wszystkich requestów wychodzących

Reac.lazy(() => Promise<PystyKomponent>)

w momencie gdy wszystkie requesty będą kompletne, to wtedy rozwiązywać tego promisa
będzie to sygnał dla SSR ze odpowiedz jest gotowa do wysłania


tylko czy włozenie danych do stanu, spowoduje rzeczywiscie ze otrzymamy inny widok przy kolejnym cyklu renderowania po stronie serwera ?
*/


