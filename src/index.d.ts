declare module '*.scss' {
  const scss: string
  export default scss
}
declare module '*.html' {
  const html: string
  export default html
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => any;
  export default MDXComponent;
}