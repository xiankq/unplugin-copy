import type { Buffer } from 'node:buffer'

export interface Target {
/**
 * path or glob，相对于root目录
 */
  src: string | string[]

  /**
   * 复制到的目标目录，相对于输出目录
   */
  dest: string

  /**
   * 是否扁平化输出，默认是保留目录结构
   * @param filePath 源文件路径
   */
  flat?: boolean | ((filePath: string) => boolean | undefined)

  /**
   * 文件重命名返回`undefined`则保持原文件名
   * @param filePath 源文件路径
   * @param destPath 格式化后的输出路径
   */
  rename?: string | ((filePath: string, destPath: string) => string | undefined)

}

export interface UnpluginCopyOptions {
  /**
   * Array of targets to copy.
   */
  targets: Target[]
}
