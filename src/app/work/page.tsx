import type { Metadata } from "next";

import { WorkIndex } from "@/components/work/work-index";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Full-stack projects with technical case studies: GymFlow, LightBase, Air Filter Prediction System and Smart Career Guide.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <WorkIndex />;
}
