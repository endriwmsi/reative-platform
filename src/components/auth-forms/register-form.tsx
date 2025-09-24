"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useState } from "react";

export function RegisterForm() {
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className="w-full">
      <div className="mb-9">
        <h1 className="text-2xl font-bold text-white mb-2">Criar conta</h1>
        <p className="text-gray-400">
          Crie sua conta e tenha acesso a todos os benefícios
        </p>
      </div>

      <form className="w-full">
        <div className="flex flex-col space-y-4">
          <Input
            id="fullname"
            type="text"
            placeholder="Nome completo"
            className="w-full bg-zinc-900 border-0 px-4 py-5"
            required
          />

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

          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirme sua senha"
            className="bg-zinc-900 border-0 px-4 py-5"
            required
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked === true)}
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-400 cursor-pointer"
            >
              Eu aceito os{" "}
              <Link
                href="/termos-e-condicoes"
                className="text-white hover:text-gray-300 underline underline-offset-4"
              >
                Termos & Condições
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full text-primary"
            variant="secondary"
            disabled={!acceptTerms}
          >
            Criar conta
          </Button>
        </div>
      </form>
    </div>
  );
}
