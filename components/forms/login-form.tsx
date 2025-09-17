import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Entrar</h1>
        <p className="text-gray-400">
          Acesse sua conta e tenha acesso a todos os benefícios
        </p>
      </div>

      <form>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full grid gap-2">
            <Input
              id="email"
              type="email"
              placeholder="E-mail"
              className="bg-zinc-900 border-0"
              required
            />
          </div>
          <div className="grid gap-2">
            <Input
              id="password"
              type="password"
              placeholder="Senha"
              className="bg-zinc-900 border-0"
              required
            />
            <div className="flex items-center">
              <Link
                href="#"
                className="ml-auto inline-block text-sm text-gray-400 hover:text-white underline-offset-4 hover:underline"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </div>
          <Button type="submit" className="w-full bg-secondary text-primary">
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );
}
