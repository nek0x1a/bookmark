import { useEffect, useState, type ComponentProps } from "react";

/**
 * 页眉：时间、问候语
 */
export default function Header({
  children,
  ...restProps
}: ComponentProps<"header">) {
  /** 问候语 */
  const helloStr = "喵 >w< ~";
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    /** 每秒更新时间 */
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <header {...restProps}>
      <div className="flex flex-col gap-4">
        {/* 日期时间 */}
        <div className="flex gap-4">
          {/* 日期 */}
          <span className="text-2xl flex-none">
            {currentDate.toLocaleDateString()}
          </span>
          {/* 星期 */}
          <span className="flex-none">
            <span className="text-slate-100 text-2xl">星期</span>
            <span className="text-amber-400 text-2xl font-bold">
              {["天", "一", "二", "三", "四", "五", "六"][currentDate.getDay()]}
            </span>
          </span>
          {/* 时间 */}
          <span className="flex-none text-amber-400 text-2xl font-bold">
            {currentDate.toLocaleTimeString()}
          </span>
        </div>

        {/* 问候语 */}
        <div className="flex-none whitespace-nowrap text-6xl font-bold">
          {helloStr}
        </div>
      </div>
    </header>
  );
}
