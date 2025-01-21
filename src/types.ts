export interface Target {
  /**
   * path or glob, relative to the root directory
   */
  src: string | string[]

  /**
   * The destination directory to copy to, relative to the output directory
   */
  dest: string

  /**
   * Whether to flatten the output, default is to preserve the directory structure
   * @param filePath The source file path
   */
  flatten?: boolean | ((filePath: string) => boolean | undefined)

  /**
   * File renaming. Returning `undefined` will keep the original file name
   * @param filePath The source file path
   * @param destPath The formatted output path
   */
  rename?: string | ((filePath: string, destPath: string) => string | undefined)
}

export interface UnpluginCopyOptions {
  /**
   * Array of targets to copy.
   */
  targets: Target[]
}
