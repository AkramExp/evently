import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/shared/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/SessionProvider";
import { getServerSession } from "next-auth";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Evently",
  description: "Evently is a platform for event management.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={poppins.variable}>
          <AuthProvider session={session}>
            <Toaster position="top-center" />
            {children}
          </AuthProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
