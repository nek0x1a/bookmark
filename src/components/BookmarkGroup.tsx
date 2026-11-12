import { cn } from "cn";
import type { ComponentProps } from "react";
import type { BookmarkGroupData } from "~/types/bookmark";
import Bookmark from "./Bookmark";

export default function BookmarkGroup({
  bookmarkGroupData,
  className,
  ...restProps
}: { bookmarkGroupData: BookmarkGroupData } & ComponentProps<"div">) {
  const bookmarkElements = bookmarkGroupData.bookmarks.map((bookmark) => {
    return (
      <Bookmark
        bookmarkData={bookmark}
        emphasized={bookmarkGroupData.emphasized}
        key={bookmark.id}
      ></Bookmark>
    );
  });
  const onlyContents = !bookmarkGroupData.emphasized;

  return (
    <div
      className={cn(onlyContents ?? "flex flex-col", className)}
      {...restProps}
    >
      <h2
        className={cn(
          bookmarkGroupData.emphasized && "col-start-1 -col-end-1",
          bookmarkGroupData.emphasized ? "text-3xl font-bold" : "text-lg",
          "text-amber-400",
        )}
      >
        {bookmarkGroupData.name}
      </h2>
      {bookmarkElements}
    </div>
  );
}
