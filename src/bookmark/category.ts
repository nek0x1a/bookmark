import type { Bookmark } from ".";

/**
 * 书签类别数据
 */
export class Category {
  /** 类别名称 */
  name: string;
  /** 是否为重要类别 */
  emphasized: boolean;
  /** 包含的书签 */
  bookmarks: Bookmark[];
  /** 类别描述 */
  description?: string;

  /**
   * 创建书签类别数据
   *
   * @param name - 类别名称
   * @param emphasized - 是否为重要类别
   * @param bookmarks - 包含的书签
   * @param description - 类别描述
   */
  constructor(
    name: string,
    emphasized = false,
    bookmarks: Bookmark[] = [],
    description?: string,
  ) {
    this.name = name;
    this.emphasized = emphasized;
    this.bookmarks = bookmarks;
    this.description = description;
  }
}
