declare module '*.scss' {
  const scss: string
  export default scss
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => any;
  export default MDXComponent;
}