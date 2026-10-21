import type { ComponentProps } from "react";

export default function Footer({
  children = <span>猫 ♥ 喵</span>,
  ...restProps
}: ComponentProps<"footer">) {
  return <footer {...restProps}>{children}</footer>;
}
