interface OptionsParamsType<T> {
    onChangesInSubscriptions?: (self: EventEmmiter<T>) => void
}

export class EventEmmiter<T> {
    private events: Set<(param: T) => void> = new Set();

    private readonly options?: OptionsParamsType<T>;

    public constructor(options?: OptionsParamsType<T>) {
        this.options = options;
    }

    private triggerChangeChangesInSubscriptions(): void {
        this.options?.onChangesInSubscriptions?.(this);
    }

    public on(callback: (param: T) => void): (() => void) {
        let isActive = true;

        const onExec = (param: T): void => {
            if (isActive) {
                callback(param);
            }
        };

        this.events.add(onExec);
        this.triggerChangeChangesInSubscriptions();

        return (): void => {
            isActive = false;
            this.events.delete(onExec);
            this.triggerChangeChangesInSubscriptions();
        };
    }

    public trigger(param: T): void {
        const eventsCopy = Array.from(this.events.values());

        for (const itemCallbackToRun of eventsCopy) {
            try {
                itemCallbackToRun(param);
            } catch (err) {
                console.error(err);
            }
        }
    }

    public get size(): number {
        return this.events.size;
    }
}
