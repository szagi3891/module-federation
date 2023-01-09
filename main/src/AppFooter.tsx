import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { withConfig } from './utils/Config';
import { Value } from './utils/Value';

const Wrapper = withConfig(config => styled('div', { label: 'Wrapper'})`
    background-color: ${config.footerColor};
`);

const isServer = (): boolean => {
    return typeof window === 'undefined';
};

class State {
    public readonly counter: Value<number>;

    constructor() {
        this.counter = new Value(0, (setValue) => {

            const timer = setInterval(() => {
                setValue(this.counter.getValue() + 1);
            }, 5000);

            return () => {
                clearInterval(timer);
            };
        });
    }
}

interface PropsType {
    label: string,
}

const AppFooter = observer((props: PropsType) => {
    const [state] = React.useState(() => new State());
    const { label } = props;

    const message = isServer() ? "na serwerze" : "przeglądarka";

    return (
        <Wrapper>
            <div>AppFooter, counter = {state.counter.getValue()} label = {label} </div>
            { message }
        </Wrapper>
    )
});

export default AppFooter;
