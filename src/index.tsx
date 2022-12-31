import React from "react";
import ReactDOM from "react-dom";
// import Content from "./Content";

const App = () => {
    return (
        <div>
            to jest App ...
        </div>
    );
};

class AAAA {
    constructor(private readonly value: string) {
    }

    ccc = (arg: string) => {
        console.info(`${this.value} odpalam ccc, arg=${arg}`);
    }
}

const aaaa = new AAAA('zmienna prywatna');
const ccc = aaaa.ccc;
ccc('parametr jakis');

const root = document.getElementById("root");

if (root === null) {
    console.error('Brak root');
} else {
    ReactDOM.render(<App />, root);
}
