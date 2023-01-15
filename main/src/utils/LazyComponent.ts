import * as React from 'react';
import { registerNetworRequest } from './Idle';

export const ReactLazy = <T>(load: () => Promise<React.ComponentType<T>>): React.LazyExoticComponent<React.ComponentType<T>> => {

    // () => Promise<{ default: ComponentType<any>; }>

    const aaa = React.lazy(async () => {
        const unregister = registerNetworRequest();
        const component = await load();
        unregister();

        return {
            default: component
        };
    });

    return aaa;
    // React.lazy()
};


