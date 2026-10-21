import { mainNav } from "@/content/navigation";
import { talkHref } from "@/content/site";
import { HeaderBar } from "./header-bar";

/** Sticky dark header. Content is static; scroll state and the active indicator live in HeaderBar. */
export function SiteHeader() {
  return <HeaderBar items={mainNav} talkHref={talkHref} />;
}
