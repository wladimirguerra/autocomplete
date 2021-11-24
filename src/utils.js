/**
 * This module is part of an open source library created by me (react-js-async-hooks).
 *
 */

export class HasCanceledError extends Error {

    constructor() {
        super("Promise Canceled");
        this.isCanceled = true;
    }
}

/**
 * The following function was based on [@istarkov code](https://github.com/facebook/react/issues/5465#issuecomment-157888325)
 *
 * @param promise
 */
export const makeCancelable = (promise) => {
    let hasCanceled_ = false;

    if (!promise) throw new Error("Promise must not be null!");

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            (val) => (hasCanceled_ ? reject(new HasCanceledError()) : resolve(val)),
            (error) => (hasCanceled_ ? reject(new HasCanceledError()) : reject(error)),
        );
    });

    return [
        wrappedPromise,
        () => {
            hasCanceled_ = true;
        },
    ];
};
