type UnsubscribeType = () => void;
type Callback = () => void;

type Id = {};

class Idle {

    private readonly request: Set<Id>;
    private callback: Map<Id, Callback>;

    public constructor() {
        this.request = new Set();
        this.callback = new Map();
    }

    private refresh = (): void => {
        if (this.request.size === 0) {
            
            const callback = this.callback;
            this.callback = new Map();
            for (const callbackItem of callback.values()) {
                console.info('callback iddle run');
                callbackItem();
            }
        }

    };

    public registerNetworRequest = (): UnsubscribeType => {
        const id: Id = {};

        this.request.add(id);
        console.info(`request count=${this.request.size}`);

        return (): void => {
            this.request.delete(id);
            console.info(`request count=${this.request.size}`);
            this.refresh();
        };
    }

    public whenIddle = (callback: Callback): UnsubscribeType => {
        const id: Id = {};
        this.callback.set(id, callback);

        this.refresh();

        return () => {
            this.callback.delete(id);
        };
    }
}

const idle = new Idle();

export const registerNetworRequest = idle.registerNetworRequest;
export const whenIddle = idle.whenIddle;


