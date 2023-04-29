declare function init(element: HTMLElement): void;

declare const overlayBehaviour_init: typeof init;
declare namespace overlayBehaviour {
  export {
    overlayBehaviour_init as init,
  };
}

export { init as i, overlayBehaviour as o };
