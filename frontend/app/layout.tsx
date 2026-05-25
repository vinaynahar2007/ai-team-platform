import type { Metadata } from "next"

import "./globals.css"

import { Toaster } from "react-hot-toast"

export const metadata: Metadata = {

  title: "AI Team Platform",

  description: "AI powered teammate matching platform",

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (

    <html lang="en">

      <body>

        <Toaster />

        {children}

      </body>

    </html>

  )

}