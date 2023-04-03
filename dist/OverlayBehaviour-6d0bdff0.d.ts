declare function init(element: HTMLElement): void;

declare const OverlayBehaviour_init: typeof init;
declare namespace OverlayBehaviour {
  export {
    OverlayBehaviour_init as init,
  };
}

export { OverlayBehaviour as O, init as i };
