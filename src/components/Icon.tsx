import type { ComponentProps } from "react";

/**
 * 图标选择器
 *
 * @param name - 图标名称
 * @param size - 尺寸
 */
export default function Icon({
  name = "",
  size = "md",
  className = "",
  ...restprops
}: { name: string; size: "md" | "lg" } & ComponentProps<"i">) {
  const iconClassName = `align-middle ti ti-${name} ${size === "lg" ? "emphasized-icon" : "normal-icon"} ${className}`;
  return <i className={iconClassName} {...restprops} />;
}
