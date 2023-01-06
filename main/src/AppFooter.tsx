import { observable, makeObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

// const isServer = (): boolean => {
//     return typeof window === 'undefined';
// };

class State {
    @observable counter: number = 0;

    constructor() {
        makeObservable(this);
    }
}

interface PropsType {
    label: string,
}

const AppFooter = observer((props: PropsType) => {
    const [state] = React.useState(() => new State());
    const { label } = props;

    // const message = isServer() ? "na serwerze" : "przeglądarka";

    React.useEffect(() => {
        console.info("inicjuję timer footera zwiększający licznik");

        const timer = setInterval(() => {
            state.counter += 1;
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            <div>AppFooter, counter = {state.counter} label = {label} </div>
            {/* <div>{ message }</div> */}
        </div>
    )
});

export default AppFooter;
