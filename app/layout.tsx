import "./globals.css";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` min-h-screen ${inter.className}`}>
        <div className="flex-col min-h-screen bg-slate-200">
          <header className=" shadow-md sticky top-0 bg-slate-300">
            <div className="max-w-4xl mx-auto py-4 px-4">
              <h1 className=" sm:text-3xl font-bold text-gray-900 text-center ">
                Gestor de tareas
              </h1>
            </div>
          </header>
          <main className="max-w-4xl mx-auto w-full px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

