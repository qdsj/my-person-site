import dayjs from "dayjs";
import Script from "next/script";

const rawBuildTime = process.env.NEXT_PUBLIC_BUILD_TIME ?? "";
const formattedBuildTime = rawBuildTime
  ? dayjs(rawBuildTime).format("YYYY年MM月DD日 HH:mm:ss")
  : "";

const buildTimeScript = `
  (() => {
    if (typeof window === "undefined") return;
    if (window.__PROJECT_BUILD_TIME_LOGGED__) return;
    window.__PROJECT_BUILD_TIME_LOGGED__ = true;
    window.__PROJECT_BUILD_TIME__ = ${JSON.stringify(formattedBuildTime)};
    console.log("[build time]", window.__PROJECT_BUILD_TIME__);
  })();
`;

export function BuildTimeScript() {
  return (
    <Script id="project-build-time" strategy="afterInteractive">
      {buildTimeScript}
    </Script>
  );
}
