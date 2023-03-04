import { makeAutoObservable } from 'mobx';
import * as React from 'react';

export class AppState {

    private isAuthorizedInner: boolean = false;

    public readonly from: string;

    constructor(from: string) {
        console.log('PLAYERS - constructor', from)

        this.from = from;

        makeAutoObservable(this);
    }

    onLogin = () => {
        console.log('PLAYERS onLogin this.from', this.from)
        this.isAuthorizedInner = true;
    }

    onLogout = () => {
        console.log('PLAYERS onLogout this.from', this.from)
        this.isAuthorizedInner = false;
    }

    get isAuthorized(): boolean {
        console.log('PLAYERS isAuthorized this.from', this.from)
        return this.isAuthorizedInner;
    }

}

interface CreateContextResult<T> {
    AppContext: React.Context<T>,
    useContext: () => T
}

export const createContext = <T>(label: string): CreateContextResult<T> => {
    const marker = {};

    //@ts-expect-error
    const AppContext = React.createContext<T>(marker);

    const useContext = (): T => {
        const context = React.useContext(AppContext);

        if (context === marker) {
            throw Error(`value was read out of context => "${label}"`);
        }

        return context;
    };

    return {
        AppContext,
        useContext
    };
};

const { AppContext, useContext } = createContext<AppState>('appState');
export const AppStateProvider = AppContext.Provider;

export const useAppStateContext = (): AppState => {
    return useContext();
};

export const appState = new AppState('from itself');