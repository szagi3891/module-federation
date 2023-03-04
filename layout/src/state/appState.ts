import { makeAutoObservable } from 'mobx';
import * as React from 'react';
import { Resource } from '../utils/Resource';
// @ts-expect-error
const PlayersAppStateModule = import("players/appState");
// @ts-expect-error
const SportsbookAppStateModule = import("sportsbook/appState");

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

  export interface PlayersAppState {
}

  export interface SportsbookAppState {

}

export default class AppState {
    private readonly playersAppStateModuleResource: Resource<PlayersAppState>;
    private readonly sportsbookAppStateModuleResource: Resource<SportsbookAppState>;

    constructor() {

        this.playersAppStateModuleResource = new Resource(async (): Promise<PlayersAppState> => {
            const PlayersAppStateModuleResponse = await PlayersAppStateModule;
            return new PlayersAppStateModuleResponse.AppState('from layouts');
        });

        this.sportsbookAppStateModuleResource = new Resource(async (): Promise<SportsbookAppState> => {
            const SportsbookAppStateModuleResponse = await SportsbookAppStateModule;
            return new SportsbookAppStateModuleResponse.AppState('from layouts', {
                getIsAuthorized: () => this.isAuthorized
            });
        });

        makeAutoObservable(this);
    }

    get playersAppState(): PlayersAppState | null {
        const resource = this.playersAppStateModuleResource.get();

        if (resource.type === 'ready') {
            return resource.value
        }

        return null;
    }

    get sportsbookAppState(): SportsbookAppState | null {
        const resource = this.sportsbookAppStateModuleResource.get();

        if (resource.type === 'ready') {
            return resource.value
        }

        return null;
    }

    get isAuthorized(): unknown {
        // @ts-expect-error
        return this.playersAppState?.isAuthorized;
    }
}

const { AppContext, useContext } = createContext<AppState>('appState');
export const AppStateProvider = AppContext.Provider;

export const useAppStateContext = (): AppState => {
    return useContext();
};

export const appState = new AppState();
