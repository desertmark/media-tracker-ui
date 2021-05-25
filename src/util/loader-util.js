export default class LoaderUtil {

    _subscribers = [];
    _tasks = [];

    get isLoading() {
        return this._tasks.length > 0;
    }

    /**
     * Subscribe to isLoading changes.
     * @param {(isLoading: boolean) => void} subscriberFn 
     * @returns {number} subscriptionId useful to call `unsubscribe(subscriptionId)` method 
     */
    subscribe(subscriberFn) {
        return this._subscribers.push(subscriberFn);
    }

    /**
     * unsubscribe from isLoading changes
     * @param {number} subscriptionId 
     */
    unsubscribe(subscriptionId) {
        const sub = this._subscribers[subscriptionId];
        this._subscribers = this._subscribers.filter(s => s !== sub);
    }

    /**
     * Wait for the given task before setting isLoading to false
     * @param {PromiseLike} task 
     */
    waitFor(task) {
        this._tasks.push(task);
        if (this._tasks.length === 1) {
            this._notify();
        }
        task.finally(() => {
            this._removeTask(task);
            if (!this.isLoading) {
                this._notify();
            }
        });
    }

    _removeTask(task) {
        this._tasks = this._tasks.filter(t => t!== task);
    }

    _notify() {
        this._subscribers.forEach(subFn => {
            subFn(this.isLoading);
        });
    }
}

