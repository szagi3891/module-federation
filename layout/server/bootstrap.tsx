import React from 'react';
import express from 'express';
import { App } from 'src/App';
import { Helmet } from 'react-helmet';
import { renderToPipeableStream } from 'react-dom/server';

const PORT = 6010;
const app = express();

app.use('/static', express.static("./dist/client"));

app.get('/*', async (req, res, next) => {
    const helmet = Helmet.renderStatic();
    let didError = false;
  
    const stream = renderToPipeableStream(<App />, {
      onAllReady() {
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-type', 'text/html');
        // res.write(`<!DOCTYPE html />`);
        res.write(`<html>
        <head>
          <title>App</title>
          <script defer src="http://localhost:6010/static/main.js"></script>
        </head>
        <body>`);
        res.write(`<div id="root">`);
        stream.pipe(res);
        res.write(`</div>`);
        res.write(`</body></html>`);
      },



// <html>
// <head>
//   <title>App</title>
// <script defer src="http://localhost:6010/static/main.js"></script></head>
// <body>
//   <div id="root"></div>
// </body>
// </html>
      onShellError() {
        res.statusCode = 500;
        res.send(`<h1>An error occurred</h1>`)
      },
      onError(err) {
        didError = true;
        console.error(err);
      }
    })
  });

app.listen(PORT, () => {
    console.info(
        `[${new Date().toISOString()}]`,
        `Shell App is running: 🌎 http://localhost:${PORT}`,
    );
});
