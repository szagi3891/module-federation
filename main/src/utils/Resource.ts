import { PromiseBox } from "./PromiseBox";
import { Value } from "./Value";

const TIMEOUT = 10000;

interface ResultLoading {
    readonly type: 'loading',
    readonly whenReady: Promise<void>,
}

interface ResultReady<T> {
    readonly type: 'ready',
    readonly value: T
};

interface ResultError {
    readonly type: 'error',
}

export type Result<T> = ResultLoading | ResultReady<T> | ResultError;


const send = <T>(loadValue: () => Promise<T>): Promise<Result<T>> => {
    return new Promise(async (resolve) => {
        setTimeout(() => {
            resolve({
                type: 'error'
            });
        }, TIMEOUT);

        try {
            const loadedValue = await loadValue();

            resolve({
                type: 'ready',
                value: loadedValue,
            });
        } catch (err) {
            console.error(err);

            resolve({
                type: 'error'
            });
        }
    })
}

class Request<T> {
    private readonly prevValue: Result<T> | null;;
    public readonly whenReady: Promise<void>;
    private value: Value<Result<T>>;

    constructor(getValue: () => Promise<T>, prevValue: Result<T> | null) {
        this.prevValue = prevValue;

        const valuePromise = send(getValue);

        const whenReady = new PromiseBox<void>();
        this.whenReady = whenReady.promise;

        this.value = new Value({
            type: 'loading',
            whenReady: this.whenReady
        });

        setTimeout(async () => {
            const value = await valuePromise;
            this.value.setValue(value);
            whenReady.resolve();
        }, 0);
    }

    public get(): Result<T> {
        const current = this.value.getValue();

        if (current.type !== 'loading') {
            return current;
        }

        if (this.prevValue !== null) {
            if (this.prevValue.type === 'loading') {
                return {
                    type: 'loading',
                    whenReady: current.whenReady
                };
            }

            return this.prevValue;
        }

        return current;
    }
}

export class Resource<T> {
    private readonly loadValue: () => Promise<T>;
    private request: Value<null | Request<T>>;
    private new_request: Request<T> | null = null;

    constructor(loadValue: () => Promise<T>) {
        this.loadValue = loadValue;
        this.request = new Value(null);
    }

    get(): Result<T> {
        const request = this.request.getValue();

        if (request === null) {
            if (this.new_request === null) {
                this.new_request = new Request(this.loadValue, null);

                setTimeout(() => {
                    if (this.new_request !== null) {
                        this.request.setValue(this.new_request);
                        this.new_request = null;
                    }
                }, 0);
            }

            return this.new_request.get();
        }

        return request.get();
    }

    async clearAndWait(): Promise<void> {
        const request = new Request(this.loadValue, null);
        this.request.setValue(request);
        await request.whenReady;
    }

    clear() {
        this.request.setValue(new Request(this.loadValue, null));
    }

    async refreshAndWait(): Promise<void> {
        const prevValue = this.get();
        const request = new Request(this.loadValue, prevValue);
        this.request.setValue(request);
        await request.whenReady;
    }

    refresh() {
        const prevValue = this.get();
        this.request.setValue(new Request(this.loadValue, prevValue));
    }
}
