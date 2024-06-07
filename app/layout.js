import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";

const baiJamjuree = Bai_Jamjuree(
  {
    subsets: ['latin'],
    weight: '400',
  }
);

export const metadata = {
  title: "Planeta Geek",
  description: "Planeta Geek Web Site",
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>{/*Agrego la etiqueta head aquí para poder agregar la etiqueta meta de http-equiv, la cual no está soportada por Next JS*/}
      </head>
      <body className={baiJamjuree.className}>{children}</body>
    </html>
  );
}