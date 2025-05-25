import type { ComponentProps } from "react";

import type { Category } from "../../bookmark";
import Icon from "../Icon";

/**
 * 重要书签组
 *
 * @param category - 书签组内容
 */
export default function EmphasizedGroup({
  category,
  ...restProps
}: {
  category: Category;
} & ComponentProps<"div">) {
  /** 书签组 */
  const group = category.bookmarks.map((b) => (
    <a href={b.url} target="_blank" key={b.name} rel="noreferrer">
      <div className="flex gap-2 rounded-md p-2 hover:bg-slate-900 transition duration-150">
        {/* 图标 */}
        <div className="flex-none content-center justify-center">
          <Icon name={b.icon} size="lg" />
        </div>
        <div>
          {/* 名称 */}
          <div className="text-amber-300">{b.name}</div>
          {/* 简介 */}
          <div className="text-xs">{b.description}</div>
        </div>
      </div>
    </a>
  ));

  return (
    <div {...restProps}>
      <h2 className="text-3xl mt-0 mb-4 font-bold text-amber-300">
        {category.name}
      </h2>
      <div className="bookmark-grid">
        {/* 书签组 */}
        {group}
      </div>
    </div>
  );
}
