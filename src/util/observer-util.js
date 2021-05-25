/**
 * WORK IN PROGRESS
 */

class Source {
    constructor() {
        this._subscribers = [];
    }
    next(value) {
        this._subscribers.forEach(sub => sub(value));
    }

    add(sub) {
        this._subscribers.push(sub);
    }

    remove(sub) {
        this._subscribers = this._subscribers.filter(s => s !== sub);
    }
}

class Subscription {
    constructor(cb, source) {
        this._cb = cb;
        this._source = source;
    }

    unsubscribe() {
        this._source.remove(this._cb);
    }
}

export class ObserverUtil {

    constructor(cb) {
        this._cb = cb;
        this._source = new Source();
    }

    subscribe(subscriber) {
        this._source.add(subscriber);
        if (this._source._subscribers.length === 1) {
            this._cb(this._source);
        }
        return new Subscription(subscriber, this._source);
    }

}

export class Subject extends ObserverUtil {
    constructor() {
        super(() => true);
    }

    next(value) {
        this._source.next(value);
    }
}




function interval(ms) {
    return new ObserverUtil(source => {
        setInterval(() => source.next(new Date().getSeconds()), ms);
    });
}

function test() {
    console.log(interval(1000).subscribe(console.log));
}

