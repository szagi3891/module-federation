import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Resource } from './Resource';
import { timeout } from './timeout';

export interface ConfigType {
    name: string,
    'backgroundColor': string,
    'footerColor': string,
}

//TODO - wyniesc do api zewnętrznego

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

type ComponentType<PropsType> = (props: PropsType) => React.ReactElement | null;

export const withConfig = <PropsType extends {}>(buildComponent: (c: ConfigType) => ComponentType<PropsType>): ComponentType<PropsType> => {
    return observer(function withConfig(props: PropsType) {
        const result = config.get();

        if (result.type === 'loading') {
            throw result.whenReady;
        }

        if (result.type === 'ready') {
            const config: ConfigType = result.value;

            const Component = buildComponent(config);

            return React.createElement(
                Component,
                props,
            );
        }

        return null;
    });
};
