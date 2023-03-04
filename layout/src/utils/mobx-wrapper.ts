import * as mobx from 'mobx';
import { IAtom } from 'mobx';

const observable = mobx.observable;
const computed = mobx.computed;
const action = mobx.action;
const createAtom = mobx.createAtom;
const autorun = mobx.autorun;
const runInAction = mobx.runInAction;

const makeObservable = (object: object): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mobxAny: any = mobx;

    if ('makeObservable' in mobxAny) {
        const makeObservable = mobxAny.makeObservable;
        if (typeof makeObservable === 'function') {
            makeObservable(object);
        }
    }
};

export {
    observable,
    computed,
    action,
    createAtom,
    makeObservable,
    IAtom,
    autorun,
    runInAction,
};

