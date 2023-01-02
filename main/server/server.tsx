import React from 'react';
import express from 'express';
import { App } from 'src/App';
import { renderToPipeableStream } from 'react-dom/server';
import fs from 'fs';

// const express = require('express');
console.info('odpalam server');

const PORT = 8888;
const app = express();

app.use('/client', express.static("./dist/client"));
// app.use('/index.html', express.static("./dist/client/index.html"));
// app.use('/'          , express.static("./dist/client/index.html"));
// app.get('*', (req, res) => {
//     const url = req.url;

//     const aaa = <App />;

//     console.info('przychodzący url', url);

//     res.status(200);
//     res.end(`odpowiedź ${url}`);
// });

(async () => {

    const content = await fs.promises.readFile("dist/client/index.html");

    const aaa = content.toString();

    console.info('aaa', aaa);

    app.get('*', (req, res) => {
        
        // const helmet = Helmet.renderStatic();
        let didError = false;
    
        const stream = renderToPipeableStream(<App />, {
        onAllReady() {
            res.statusCode = didError ? 500 : 200;
            res.setHeader('Content-type', 'text/html');
            res.write(`<!DOCTYPE html`);
            // res.write(`<html ${helmet.htmlAttributes.toString()}>
            // <head>
            //   ${helmet.title.toString()}
            //   ${helmet.meta.toString()}
            //   ${helmet.link.toString()}
            // </head>
            // <body>`);
            res.write(`<body>`);

            res.write(`<div id="root">`);
            stream.pipe(res);
            res.write(`</div>`);
            res.write(`<script async data-chunk="main" src="/client/main.js"></script>`);
            res.write(`</body></html>`);
        },
        onShellError() {
            res.statusCode = 500;
            res.send(`<h1>An error occurred</h1>`)
        },
        onError(err) {
            didError = true;
            console.error(err);
        }
        });
    });

    app.listen(PORT, () => {
        console.info(
            `[${new Date().toISOString()}]`,
            `Shell App is running: 🌎 http://localhost:${PORT}`,
        );
    });

})();