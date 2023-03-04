import { createAtom, IAtom } from "mobx";

type UnsubscrbeType = () => void;
type ConnectType<T> = (setValue: (newValue: T) => void) => UnsubscrbeType;

export class Value<T> {
    private value: T;
    private isObservedFlag: boolean;
    private readonly atom: IAtom;
    private unsubscribe: null | UnsubscrbeType;

    public constructor(value: T, onConnect?: ConnectType<T>) {
        this.value = value;
        this.isObservedFlag = false;
        this.unsubscribe = null;

        if (onConnect === undefined) {
            this.atom = createAtom('value', () => {
                this.isObservedFlag = true;
            }, () => {
                this.isObservedFlag = false;
            });
        } else {
            this.atom = createAtom('valueConnect', () => {
                this.isObservedFlag = true;

                if (this.unsubscribe === null) {
                    this.unsubscribe = onConnect((newValue) => {
                        this.value = newValue;
                        this.atom.reportChanged();
                    });
                } else {
                    console.error('Expected null');
                }
            }, () => {
                this.isObservedFlag = false;

                if (this.unsubscribe === null) {
                    console.error('Expected subscription ');
                } else {
                    this.unsubscribe();
                    this.unsubscribe = null;
                }
            });
        }
    }

    public setValue(value: T): void {
        this.value = value;
        this.atom.reportChanged();
    }

    public getValue(): T {
        this.atom.reportObserved();
        return this.value;
    }

    public isObserved(): boolean {
        return this.isObservedFlag;
    }
}