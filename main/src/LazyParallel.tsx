import * as React from 'react';
import { observer } from "mobx-react-lite";
import { timeout } from "./utils/timeout";
import { makeObservable, observable } from 'mobx';
import { ReactLazy } from "./utils/LazyComponent";

const buildComponent = (label: string, timeoutValue: number) => ReactLazy(async () => {
    console.info(`${label} -> rozpoczynam ładowanie`);
    await timeout(timeoutValue);
    console.info(`${label} -> uruchamiam`);
    
    const com = await import('./LazyParallelOne');
    return com.default;
});

const Component1 = buildComponent('komponent1', 3000);
const Component2 = buildComponent('komponent2', 4000);
const Component3 = buildComponent('komponent3', 5000);
const Component4 = buildComponent('komponent4', 6000);
const Component5 = buildComponent('komponent5', 7000);
const Component6 = buildComponent('komponent6', 8000);

class State {
    @observable show: boolean = false;

    constructor() {
        makeObservable(this);
    }
}

export const LazyParallel = observer(() => {
    const [ state ] = React.useState(() => new State());

    if (state.show === false) {
        const onClick = () => {
            state.show = true;
        };

        return (
            <div onClick={onClick}>
                Pokaz równolegle ładowane komponenty
            </div>
        )
    }

    return (
        <div>
            <Component1 label='komponent1' />
            <Component2 label='komponent2' />
            <Component3 label='komponent3' />
            <Component4 label='komponent4' />
            <Component5 label='komponent5' />
            <Component6 label='komponent6' />
        </div>
    );
});

