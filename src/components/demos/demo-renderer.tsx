"use client";

import dynamic from "next/dynamic";
import { DemoShell } from "./DemoShell";

const DemoCorporate = dynamic(
  () => import("./demo-corporate").then((m) => m.DemoCorporate),
  { ssr: false },
);
const DemoFashion = dynamic(
  () => import("./demo-fashion").then((m) => m.DemoFashion),
  { ssr: false },
);
const DemoOrderingApp = dynamic(
  () => import("./demo-ordering-app").then((m) => m.DemoOrderingApp),
  { ssr: false },
);
const DemoProductCatalog = dynamic(
  () => import("./demo-product-catalog").then((m) => m.DemoProductCatalog),
  { ssr: false },
);
const DemoDriverApp = dynamic(
  () => import("./demo-driver-app").then((m) => m.DemoDriverApp),
  { ssr: false },
);
const DemoNoteApp = dynamic(
  () => import("./demo-note-app").then((m) => m.DemoNoteApp),
  { ssr: false },
);
const DemoEcommerce = dynamic(
  () => import("./demo-ecommerce").then((m) => m.DemoEcommerce),
  { ssr: false },
);
const DemoLanguageApp = dynamic(
  () => import("./demo-language-app").then((m) => m.DemoLanguageApp),
  { ssr: false },
);

const DEMO_COMPONENTS: Record<string, React.ComponentType> = {
  corporate: DemoCorporate,
  fashion: DemoFashion,
  "ordering-app-demo": DemoOrderingApp,
  "product-catalog-demo": DemoProductCatalog,
  "driver-app-demo": DemoDriverApp,
  "note-app-demo": DemoNoteApp,
  ecommerce: DemoEcommerce,
  "language-app": DemoLanguageApp,
};

export function DemoRenderer({
  workSlug,
  title,
  description,
  gradient,
}: {
  workSlug: string;
  title: string;
  description: string;
  gradient: string;
}) {
  const Component = DEMO_COMPONENTS[workSlug];

  if (!Component) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Demo not found</p>
      </div>
    );
  }

  return (
    <DemoShell title={title} description={description} gradient={gradient}>
      <Component />
    </DemoShell>
  );
}
