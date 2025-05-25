import type { Category } from "./category";

/**
 * 书签获取结果
 */
export class BookmarkData {
  /** 是否成功 */
  success: boolean;
  /** 数据 */
  data: Category[];
  constructor(data: Category[] = [], success = false) {
    this.success = success;
    this.data = data;
  }
}

/**
 * 获取方式
 */
export enum DataGeterWay {
  disable = "disable",
  json = "json",
}

/**
 * 书签数据获取器
 */
export class DataGeter {
  /** 获取方式 */
  way: DataGeterWay;
  /** 获取路径 */
  source: string;

  /**
   * 创建书签数据获取器
   *
   * @param way - 获取方式
   * @param source - 获取路径
   */
  constructor(way = DataGeterWay.disable, source = "./bookmarks.json") {
    this.way = way;
    this.source = source;
  }

  /**
   * 获取书签数据
   */
  async getData(): Promise<BookmarkData> {
    let ret = new BookmarkData();
    switch (this.way) {
      case DataGeterWay.json:
        ret = await fetch(this.source)
          // 转为 json
          .then((res) => res.json())
          // 若成功则创建 BookmarkData
          .then((res: Category[]) => new BookmarkData(res, true));
        break;

      default:
        // disable 则不做处理
        break;
    }
    return ret;
  }
}
