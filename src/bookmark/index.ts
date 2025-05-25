export { Category } from "./category";

/**
 * 书签数据
 */
export class Bookmark {
  /**  书签名称 */
  name: string;
  /**  书签链接 */
  url: string;
  /**  书签图标 */
  icon: string;
  /** 书签描述 */
  description?: string;

  /**
   * 创建书签数据
   *
   * @param name - 书签名称
   * @param url - 书签链接
   * @param icon - 书签图标
   * @param description - 书签描述
   */
  constructor(name: string, url: string, icon: string, description?: string) {
    this.name = name;
    this.url = url;
    this.icon = icon;
    this.description = description;
  }
}
