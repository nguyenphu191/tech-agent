import "./globals.css";
import { ToastProvider } from "@/components/ui/form-feedback";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}
