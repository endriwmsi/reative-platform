"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useState } from "react";

export function LoginForm() {
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  return (
    <div className="w-full">
      <div className="mb-9">
        <h1 className="text-2xl font-bold text-white mb-2">Entrar</h1>
        <p className="text-gray-400">
          Acesse sua conta e tenha acesso a todos os benefícios
        </p>
      </div>

      <form className="w-full">
        <div className="flex flex-col space-y-4">
          <Input
            id="email"
            type="email"
            placeholder="E-mail"
            className="w-full bg-zinc-900 border-0 px-4 py-5"
            required
          />

          <Input
            id="password"
            type="password"
            placeholder="Senha"
            className="bg-zinc-900 border-0 px-4 py-5"
            required
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="keepSignedIn"
                checked={keepSignedIn}
                onCheckedChange={(checked) => setKeepSignedIn(checked === true)}
              />
              <label
                htmlFor="keepSignedIn"
                className="text-sm text-gray-400 cursor-pointer"
              >
                Mantenha-me conectado
              </label>
            </div>
            <Link
              href="#"
              className="inline-block text-sm text-gray-400 hover:text-white underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full text-primary"
            variant="secondary"
          >
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );
}
