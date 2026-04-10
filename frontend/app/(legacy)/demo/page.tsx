import type { Metadata } from "next";
import { DemoPage } from "@/components/page/demo";

export const metadata: Metadata = {
  title: "Demo integration page",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Demo() {
  return <DemoPage />;
}
