export interface Target {
  /**
   * path or glob
   */
  src: string | string[]

  /**
   * destination
   */
  dest: string
}

export interface UnpluginCopyOptions {
  /**
   * Array of targets to copy.
   */
  targets: Target[]
}
