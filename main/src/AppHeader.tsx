import * as React from 'react';
import { withConfig } from './Config';

const AppHeader = withConfig(config => (props) => {
    const name = config.name;

    console.info('app header, wyswietlam konfiga', props);

    return (
        <div>
            AppHeader, tytuł strony z konfiguracji = {name}
        </div>
    );
});

export default AppHeader;
