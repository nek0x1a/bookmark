import { cn } from "cn";
import { DynamicIcon, type IconName, iconNames } from "lucide-react/dynamic";
import type { ComponentProps } from "react";
import type { BookmarkData } from "~/types/bookmark";

/** Lucide 支持的动态 icon 名称守卫。 */
function isIconName(value: string): value is IconName {
  return iconNames.includes(value as IconName);
}

export default function Bookmark({
  bookmarkData,
  emphasized = false,
  ...restProps
}: {
  bookmarkData: BookmarkData;
  emphasized?: boolean;
} & ComponentProps<"a">) {
  const iconSize = emphasized ? "2rem" : "1rem";
  const normalizedIcon = bookmarkData.icon.toLowerCase();
  const iconElement = isIconName(normalizedIcon) ? (
    <DynamicIcon name={normalizedIcon} size={iconSize} />
  ) : null;
  return (
    <a href={bookmarkData.href} target="_blank" rel="noreferrer" {...restProps}>
      <div
        className={cn(
          "px-2 py-1 rounded",
          "flex gap-2",
          "hover:bg-slate-800",
          "transition duration-150",
        )}
      >
        <div
          className={cn(
            emphasized ? "w-8" : "w-4",
            "overflow-hidden",
            "flex-none flex items-center justify-center",
          )}
        >
          {iconElement}
        </div>
        <div className="min-w-0">
          <div className={cn(emphasized ? "text-amber-400" : "")}>
            {bookmarkData.name}
          </div>
          {emphasized && bookmarkData.description ? (
            <div className="text-xs truncate">{bookmarkData.description}</div>
          ) : null}
        </div>
      </div>
    </a>
  );
}
