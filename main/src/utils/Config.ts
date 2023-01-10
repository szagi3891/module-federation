import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Resource } from './Resource';
import { timeout } from './timeout';

export interface ConfigType {
    name: string,
    'backgroundColor': string,
    'footerColor': string,
}

const config = new Resource(async (): Promise<ConfigType> => {
    // const response = await fetch('/config.json');
    // const json = await response.json();
    // console.info('response z configiem', json);

    await timeout(2000);

    console.info('ZAŁADOWANO KONFIGURACJĘ ...');

    //Dla uproszczenia, konfig jest zamokowany
    return {
        name: "Fajny tyruł storny",
        backgroundColor: "green",
        footerColor: 'blue'
    };
});

//TODO - odświezanie zasobu z konfiguracją
//Value, które będzie miało timeout i będzie wrapperem na resource
//w connect, będzie odpalany setInterval i ta wartosc bedzie odswiezana co 15 sekund np.


// const Header = withConfig(config => styled('div')`
//     font-size: ${config.name}
// `);
const computedWithCache = <P, R>(computedResult: (params: P) => R): ((params: P) => R) => {
    let cache: null | [P, R] = null;

    return (params: P): R => {
        if (cache === null) {
            const result = computedResult(params);
            cache = [params, result];
            return result;
        }

        const [oldParams, oldResult] = cache;

        if (oldParams === params) {
            return oldResult;
        }

        const result = computedResult(params);
        cache = [params, result];
        return result;
    };
};

type ComponentType<PropsType> = (props: PropsType) => React.ReactElement | null;

export const withConfig = <PropsType extends {}>(buildComponent: (c: ConfigType) => ComponentType<PropsType>): ComponentType<PropsType> => {

    const cacheBuildComponent = computedWithCache(buildComponent);

    return observer((props: PropsType) => {
        const result = config.get();

        if (result.type === 'loading') {
            throw result.whenReady;
        }

        if (result.type === 'ready') {
            const config: ConfigType = result.value;

            const Component = cacheBuildComponent(config);

            return React.createElement(
                Component,
                props,
            );
        }

        return null;
    });
};
