import type { Metadata } from "next";
import { SplitViewer } from "@/components/SplitViewer";

export const metadata: Metadata = {
  title: "Current split",
  description: "Current weekly training split.",
};

export default function SplitPage() {
  return <SplitViewer />;
}
