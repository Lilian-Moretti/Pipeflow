import type { ReactNode } from "react";

import { Logo } from "@/components/shared/logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center gap-6 bg-muted/30 p-4">
      <Logo size="lg" />
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
