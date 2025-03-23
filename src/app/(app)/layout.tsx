import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Go Messager",
  description: "Chat/message components for Go Messager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="white" enableSystem>
          <main className="flex h-[calc(100dvh)] flex-col">
            <div className="z-10 border rounded-lg w-full h-full text-sm flex">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
