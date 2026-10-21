import { useEffect, useState } from "react";
import BookmarkGroup from "./components/BookmarkGroup";
import Footer from "./components/Footer";
import Greeting from "./components/Greeting";
import type {
  BookmarkData,
  BookmarkGroupData,
  JsonBookmarkGroupData,
} from "./types/bookmark";

function App() {
  const [bookmarkGroups, setBookmarkGroups] = useState<BookmarkGroupData[]>([]);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBookmarkGroups() {
      try {
        const response = await fetch("./bookmarks.json", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`响应错误，状态码: ${response.status}`);
        }

        const groups: JsonBookmarkGroupData[] = await response.json();
        const loadedBookmarkGroups = groups.map((group, i) => {
          return {
            id: i,
            sort: i,
            name: group.name,
            bookmarks: group.bookmarks.map((bookmark, j) => {
              return {
                id: j,
                sort: j,
                name: bookmark.name,
                href: bookmark.href,
                icon: bookmark.icon,
                description: bookmark.description,
              } satisfies BookmarkData;
            }),
            emphasized: group.emphasized,
            description: group.description,
          } satisfies BookmarkGroupData;
        });

        setBookmarkGroups(loadedBookmarkGroups);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        setLoadingError(`书签加载失败: ${error}`);
      }
    }

    void loadBookmarkGroups();
    return () => controller.abort();
  }, []);

  return (
    <div className="page-framework flex flex-col gap-8">
      <Greeting />

      {loadingError && <p className="text-slate-400">{loadingError}</p>}
      {bookmarkGroups
        .filter((group) => group.emphasized)
        .map((group) => (
          <BookmarkGroup
            bookmarkGroupData={group}
            key={group.id}
          ></BookmarkGroup>
        ))}
      <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(12em,1fr))]">
        {bookmarkGroups
          .filter((group) => !group.emphasized)
          .map((group) => (
            <BookmarkGroup
              bookmarkGroupData={group}
              key={group.id}
            ></BookmarkGroup>
          ))}
      </div>

      <Footer className="flex justify-center text-sm text-slate-400" />
    </div>
  );
}

export default App;
