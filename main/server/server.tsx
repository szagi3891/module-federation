import React from 'react';
import express from 'express';
import { App } from 'src/App';
import { renderToString } from './renderToString';
import createCache from '@emotion/cache';

console.info('odpalam server');

const PORT = 8888;
const app = express();

app.use('/client', express.static("./dist/client"));

app.get('*', async (_req, res): Promise<void> => {
    const myCache = createCache({
        key: 'emotion-server',
    });

    const result = await renderToString(<App myCache={myCache} src='/client/main.js' />);

    res.setHeader('Content-type', 'text/html');
    res.write(`<!DOCTYPE html>`);
    res.write('<html>');
    res.write(result);
    res.write('</html>');
    res.end();
});

app.listen(PORT, () => {
    console.info(
        `[${new Date().toISOString()}]`,
        `Shell App is running: 🌎 http://localhost:${PORT}`,
    );
});




// // const helmet = Helmet.renderStatic();
// let didError = false;

// const stream = renderToPipeableStream(<App />, {
// onAllReady() {
//     res.statusCode = didError ? 500 : 200;
//     res.setHeader('Content-type', 'text/html');
//     res.write(`<!DOCTYPE html`);
//     // res.write(`<html ${helmet.htmlAttributes.toString()}>
//     // <head>
//     //   ${helmet.title.toString()}
//     //   ${helmet.meta.toString()}
//     //   ${helmet.link.toString()}
//     // </head>
//     // <body>`);
//     res.write(`<body>`);

//     res.write(`<div id="root">`);
//     stream.pipe(res);
//     res.write(`</div>`);
//     res.write(`<script async data-chunk="main" src="/client/main.js"></script>`);
//     res.write(`</body></html>`);
// },
// onShellError() {
//     res.statusCode = 500;
//     res.send(`<h1>An error occurred</h1>`)
// },
// onError(err) {
//     didError = true;
//     console.error(err);
// }
// });