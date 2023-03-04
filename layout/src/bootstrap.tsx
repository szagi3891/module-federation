import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from "./App";

export const getElement = (id: string): HTMLElement => {
    const node = document.getElementById(id);
    if (node !== null) {
        return node;
    }

    const newNode = document.createElement('div');
    newNode.setAttribute('id', id);
    document.body.appendChild(newNode);
    return newNode;
};

const render = (App: () => React.ReactElement) => {
    const domRoot = getElement('root');
    const root = ReactDOM.createRoot(domRoot);
    root.render(<App />);
};

render(App);