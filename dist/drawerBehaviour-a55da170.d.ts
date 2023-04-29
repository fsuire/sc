interface DrawerInterface {
    height: number;
    marginTop: number;
    marginBottom: number;
    paddingTop: number;
    paddingBottom: number;
    borderTopWidth: number;
    borderBottomWidth: number;
}

type DrawerElementType = HTMLElement & {
    originalStyle: DrawerInterface;
    mutationObserver: MutationObserver;
};

declare function connect(element: HTMLElement): void;
declare function disconnect(element: HTMLElement): void;
declare function update(drawerElement: DrawerElementType): void;

declare const drawerBehaviour_connect: typeof connect;
declare const drawerBehaviour_disconnect: typeof disconnect;
declare const drawerBehaviour_update: typeof update;
declare namespace drawerBehaviour {
  export {
    drawerBehaviour_connect as connect,
    drawerBehaviour_disconnect as disconnect,
    drawerBehaviour_update as update,
  };
}

export { disconnect as a, connect as c, drawerBehaviour as d, update as u };
