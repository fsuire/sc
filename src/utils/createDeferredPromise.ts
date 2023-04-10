type DeferredPromiseType = Promise<unknown> & { resolve: () => void; reject: () => void }

export default function createDeferredPromise(): DeferredPromiseType {
    let resolvePromise!: () => void
    let rejectPromise!: () => void

    const promise = new Promise((resolve, reject) => {
        resolvePromise = resolve as () => void
        rejectPromise = reject as () => void
    }) as DeferredPromiseType

    promise.resolve = resolvePromise
    promise.reject = rejectPromise

    return promise
}
