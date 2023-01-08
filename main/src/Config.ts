import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Resource } from './utils/Resource';
import { timeout } from './utils/timeout';

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

    await timeout(5000);

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
    return observer((props: PropsType) => {
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



// const wrapConfig = <
//     PropsType extends { confif: ConfigType }
// >(
//     component: (props000: PropsType) => React.ReactElement | null
// ) => {

//     // type aaa = Omit<{config: string, name: string}, 'config'>;

//     // //@ts-expect-error
//     // const dddd: aaa = '';
//     // const aaaaa: {config: string, name: string} = {
//     //     ...dddd,
//     //     config: 'asda'
//     // };

//     return observer((props: Omit<PropsType, 'config'>) => {
//         const result = config.get();

//         if (result.type === 'loading') {
//             throw result.whenReady;
//         }

//         if (result.type === 'ready') {
//             const config: ConfigType = result.value;
            
//             /*
//             Type 'Omit<PropsType, "config"> & { config: ConfigType; }' is not assignable to type 'PropsType'.

//             'Omit<PropsType, "config"> & { config: ConfigType; }' is assignable to the constraint of type 'PropsType',
//             but 'PropsType' could be instantiated with a different subtype of constraint '{ config: ConfigType; }'.ts(2322)
//             */

//             // const merge = (...objects) => ({ ...objects });

//             //TODO - poprawić problem z typami
//             //@ ts-expect-error
//             const propsWithConfig: PropsType & { config: ConfigType } = {
//                 ...props,
//                 config,
//             };

//             return (
//                 React.createElement(
//                     component,
//                     propsWithConfig,
//                 )
//             )
//         }

//         // return React.createElement('div', {}, "Error loading config");
//         return null;
//     });
//     //config.json
// };

