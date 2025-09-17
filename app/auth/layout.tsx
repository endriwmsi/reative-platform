import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faça login na plataforma",
  description: "Página de Login da plataforma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="flex antialiased h-screen w-full items-center justify-center">
        <div className="flex space-x-4">
          <div className="bg-zinc-500 w-1/3 p-14">{children}</div>
          <div className="bg-zinc-500 w-2/3">Imagem</div>
        </div>
      </body>
    </html>
  );
}
