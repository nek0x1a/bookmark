import { useEffect, useState, type ComponentProps } from "react";
import "@tabler/icons-webfont/dist/tabler-icons.css";

import EmphasizedGroup from "./EmphasizedGroup";
import NormalGroup from "./NormalGroup";
import { DataGeter, DataGeterWay } from "../../bookmark/dataGeter";
import type { Category } from "../../bookmark";
import "./style.css";

/**
 * 书签页面
 */
export default function Bookmark({
  children,
  ...resprops
}: ComponentProps<"main">) {
  /** 加载状态 */
  const [isLoading, setLoading] = useState(true);
  /** 书签数据 */
  const [bookmarks, setBookmarks] = useState<Category[]>([]);
  /** 书签加载器 */
  const [dataGeter] = useState(
    new DataGeter(DataGeterWay.json, "./bookmarks.json"),
  );

  // 页面加载完成时获取书签数据
  useEffect(() => {
    dataGeter.getData().then((res) => {
      if (res.success) {
        // 获取成功则加载数据
        setBookmarks(res.data);
        setLoading(false);
      } else {
        // 获取失败则使用空数据
        setBookmarks([]);
        setLoading(false);
      }
    });
  }, [dataGeter]);

  // 正则加载提示
  if (isLoading) {
    return (
      <main {...resprops}>
        <Notice>
          <p>正在加载...</p>
        </Notice>
      </main>
    );
  }

  // 空数据提示
  if (!bookmarks) {
    return (
      <main {...resprops}>
        <Notice title="暂无数据">
          <p className="text-sm text-slate-300">请检查数据或配置文件</p>
        </Notice>
      </main>
    );
  }

  /** 重要书签组 */
  const emphasizedGroups = bookmarks
    .filter((c) => c.emphasized)
    .map((c) => <EmphasizedGroup key={c.name} category={c} />);

  /** 普通书签组 */
  const normalGroups = bookmarks
    .filter((c) => !c.emphasized)
    .map((c) => <NormalGroup key={c.name} category={c} />);

  return (
    <main {...resprops}>
      <div className="flex flex-col gap-8">
        {/* 重要书签组 */}
        <div className="flex flex-col gap-8">{emphasizedGroups}</div>
        {/* 普通书签组 */}
        <div className="bookmark-grid">{normalGroups}</div>
      </div>
    </main>
  );
}

/**
 * 提示信息
 *
 * @param title - 标题
 * @param children - 提示内容
 */
function Notice({
  title,
  children,
}: { title?: string } & ComponentProps<"div">) {
  return (
    <div className="flex place-content-center my-32">
      <div className="w-[60%] max-w-200 p-4 bg-slate-800 border-1 border-slate-600 rounded-lg shadow-xl">
        {/* 如果有标题则显示 */}
        {title ? (
          <>
            <p>{title}</p>
            <hr className="my-4 text-slate-500" />
          </>
        ) : null}

        {/* 提示内容 */}
        {children}
      </div>
    </div>
  );
}
