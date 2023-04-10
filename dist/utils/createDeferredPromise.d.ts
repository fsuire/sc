type DeferredPromiseType = Promise<unknown> & {
    resolve: () => void;
    reject: () => void;
};
declare function createDeferredPromise(): DeferredPromiseType;

export { createDeferredPromise as default };
