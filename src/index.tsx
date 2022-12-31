import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

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
