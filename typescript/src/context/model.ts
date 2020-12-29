class Context {
    private pool: Set<Model>;
    public of<T extends Model>(className: Ctor<T>): T {
        for (let instance of this.pool) {
            if (instance instanceof className) {
                return instance;
            }
        }
        return null;
    }
    public inject<T extends Model>(instance: T) {
        this.pool.add(instance);
    }
    public reject<T extends Model>(instance: T) {
        this.pool.delete(instance);
    }
}

class Model {
    protected context: Context;
    constructor(context: Context) {
        this.context = context;
        context.inject(this);
    }
    destroy() {
        this.context.reject(this);
    }
}
