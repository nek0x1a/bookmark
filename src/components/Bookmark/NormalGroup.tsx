import type { ComponentProps } from "react";

import type { Category } from "../../bookmark";
import Icon from "../Icon";

/**
 * 普通书签组
 *
 * @param category - 书签组内容
 */
export default function NormalGroup({
  category,
  ...restProps
}: {
  category: Category;
} & ComponentProps<"div">) {
  /** 书签组 */
  const group = category.bookmarks.map((b) => (
    // 单个书签
    <a href={b.url} target="_blank" key={b.name} rel="noreferrer">
      <div className="flex gap-2 p-2 rounded-md hover:bg-slate-900 transition duration-150">
        {/* 图标 */}
        <div className="flex-none content-center justify-center">
          <Icon name={b.icon} size="md" />
        </div>
        {/* 名称 */}
        <div className="">{b.name}</div>
      </div>
    </a>
  ));

  return (
    <div {...restProps}>
      <h2 className="text-lg mt-0 mb-2 text-amber-300">{category.name}</h2>
      <div className="flex flex-col gap-x-2">
        {/* 书签组 */}
        {group}
      </div>
    </div>
  );
}
