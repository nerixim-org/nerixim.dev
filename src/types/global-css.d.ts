declare module "*.css" {
  const content: string
  // biome-ignore lint/style/noDefaultExport: CSS module declarations use a default export shape.
  export default content
}
