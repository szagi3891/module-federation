import * as React from 'react';

const isServer = (): boolean => {
    return typeof window === 'undefined';
};

const AppFooter = () => {
    const message = isServer() ? "na serwerze" : "przeglądarka";

    return (
        <div>
            <div>AppFooter</div>
            <div>{ message }</div>
        </div>
    )
};

export default AppFooter;
