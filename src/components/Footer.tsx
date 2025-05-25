import type { ComponentProps } from "react";

/**
 * 页脚
 */
export default function Footer({
  children,
  ...restProps
}: ComponentProps<"footer">) {
  return (
    <footer {...restProps}>
      <div className="flex justify-center text-sm text-slate-300">
        <span>猫 ♥ 喵</span>
      </div>
    </footer>
  );
}
