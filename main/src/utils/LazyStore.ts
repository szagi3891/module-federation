import { makeObservable, observable } from "mobx";
import { timeout } from "./timeout";
import { Value } from "./Value";

type State<T> = null | { type: 'ready', value: T };

/*
//Przykładowe uzycie

const lazyInstancja = LazyStore.create(() => import('/sciezka/do/klasy'), {
    a: 1,
    b: 2
});
*/

export class LazyStore<T> {
    private readonly getStoreClass: () => Promise<T>;
    @observable private state: Value<State<T>>;
    private stateAsync: null | Promise<T> = null;

    private constructor(getStoreClass: () => Promise<T>) {
        makeObservable(this);
        this.state = new Value<State<T>>(null, (setValue) => {
            if (this.stateAsync === null) {
                const statePromise = this.getAsync();

                (async () => {
                    const state: T = await statePromise;
                    await timeout(0);
                    setValue({ type: 'ready', value: state });    
                })();
            }

            return () => {
            };
        });

        this.stateAsync = null;
        this.getStoreClass =  getStoreClass;
    }

    public create<P>(getStoreClass: () => Promise<(params: P) => T>, params: P): LazyStore<T> {        
        return new LazyStore(() => getStoreClass().then((build) => build(params)));
    }

    public async getAsync(): Promise<T> {
        if (this.stateAsync === null) {
            this.stateAsync = this.getStoreClass();
            return this.stateAsync;
        }

        return this.stateAsync;
    }

    //reaktywne pobieranie tej instancji
    public getState(): T | null {
        const value = this.state.getValue();
        
        if (value !== null) {
            return value.value;
        }
        
        return null;
    }
}