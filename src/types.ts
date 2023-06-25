export interface Target {
  src: string | string[]
  dest: string
}
export interface UnpluginCopyOptions {
  targets: Target[]
}
