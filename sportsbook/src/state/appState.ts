import { makeAutoObservable } from 'mobx';
import * as React from 'react';

interface InitSetupType {
    getIsAuthorized: () => boolean;
}

export class AppState {

    private readonly initSetup: InitSetupType;
    private readonly from: string;

    constructor(from: string, initSetup: InitSetupType) {
        console.log('SPORTSBOOK - constructor', from)

        this.initSetup = initSetup;
        this.from = from;

        makeAutoObservable(this);
    }

    get isAutorized(): boolean {
        console.log('SPORTSBOOK isAutorized this.from', this.from)
        return this.initSetup.getIsAuthorized();
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
const initSetip: InitSetupType = {
    getIsAuthorized: () => false
}
export const appState = new AppState('from itself', initSetip);