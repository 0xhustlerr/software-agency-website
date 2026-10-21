import { notFound } from "next/navigation";

/**
 * Target for Proxy rewrites of unknown slugs. Calling notFound() during
 * prerendering makes this a static page served with a real 404 status
 * (Cache Components can't use dynamicParams = false).
 */
export default function Missing() {
  notFound();
}
