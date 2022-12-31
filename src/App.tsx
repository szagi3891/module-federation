import React, { Suspense } from "react";

const timeout = (time: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};

const AppHeader = React.lazy(async () => {
    console.info("AppHeader - rozpoczynam ładowanie");
    await timeout(2000);
    console.info("AppHeader - rozpoczynam ładowanie");
    return import('./AppHeader');
});

export const App = () => {
    const [show, setShow] = React.useState(false);

    return (
        <div>
            <div onClick={() => setShow(true)}>to jest App ... --- pokaz</div>
            { show ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <AppHeader />
                </Suspense>
            ) : null }
        </div>
    );
};
