import { V1Home } from "@/components/sections/v1-home";
import { V2Content } from "./v2/v2-content";
import { isV2Live } from "@/lib/site-version";

/**
 * Which design the site serves at "/" is a deploy-time switch, not a code edit:
 * set NEXT_PUBLIC_SITE_VERSION to "v1" or "v2" in Vercel and redeploy.
 * Both versions stay reachable at /v1 and /v2 whatever the flag says.
 */
export default function HomePage() {
  return isV2Live() ? <V2Content /> : <V1Home />;
}
