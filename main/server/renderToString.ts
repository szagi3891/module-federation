import React from 'react';
import { PipeableStream, renderToPipeableStream } from 'react-dom/server';
import { Writable } from 'stream';

const streamToString = (stream: PipeableStream, resolve: (response: string) => void) => {
    const { pipe } = stream;

    const result: Array<string> = [];

    pipe(new Writable({
        write(chunk, _encoding, callback): void {
            const html = chunk.toString();
            result.push(html);
            callback();
        },
        final: (): void => {
            resolve(result.join(''));
        }
    }));
};

export const renderToString = (reactElement: React.ReactElement): Promise<string> => {
    return new Promise((resolve, reject) => {
        let error: null | string = null;

        const stream: PipeableStream = renderToPipeableStream(reactElement, {
            onAllReady() {
                streamToString(stream, resolve);
            },
            onShellError() {
                reject(error);
            },
            onError(err) {
                error = String(err).toString();
            },
        });
    });
};
