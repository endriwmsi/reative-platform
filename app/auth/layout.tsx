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
      <body className="min-h-screen relative flex items-center justify-center p-12">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=2029&q=80')",
          }}
        ></div>

        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Background decorative circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        </div>

        {/* Login card */}
        <div className="relative flex z-10 w-full max-w-7xl">
          <div className="bg-zinc-950 w-[40%] backdrop-blur-sm rounded-l-2xl shadow-2xl border border-gray-700/50 p-12">
            {/* Logo */}
            <div className="mb-10">
              <div className="text-white text-2xl font-bold">Lorem Ipsum</div>
              <div className="text-gray-400 text-sm">Platform</div>
            </div>

            {/* Content with original padding */}
            <div className="pt-24">{children}</div>
          </div>

          <div className="w-[60%] bg-white/10 backdrop-blur-xl rounded-r-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-gray-400/10 via-transparent to-white/5"></div>

            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-white/60 text-lg font-light"></div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
