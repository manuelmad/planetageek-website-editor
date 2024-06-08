import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";

const baiJamjuree = Bai_Jamjuree(
  {
    subsets: ['latin'],
    weight: '400',
  }
);

export const metadata = {
  title: "Planeta Geek Website Editor",
  description: "A private web app where the content creator, owner of the branch Planeta Geek, can loging to update images, titles and texts of the articles existing in his public website.",
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