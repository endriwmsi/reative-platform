import { RegisterForm } from "@/components/auth-forms/register-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registre-se na plataforma",
  description: "Página de registro da plataforma",
};

const RegisterPage = () => {
  return (
    <div className="flex flex-col">
      <RegisterForm />

      {/* Social Login Section */}
      <div className="w-full mt-6">
        <div className="relative flex w-full items-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <div className="mx-4 text-sm text-gray-400 px-2">Ou entrar com</div>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <div className="flex mt-4 gap-2">
          <Button className="text-xs flex-1">Google</Button>
          <Button className="text-xs flex-1">Facebook</Button>
        </div>
      </div>

      {/* Registration Link */}
      <div className="mt-6 text-center text-sm w-full">
        <span className="text-gray-400">Já tem uma conta? </span>
        <Link
          href="/auth/login"
          className="text-white underline underline-offset-4 hover:text-gray-300"
        >
          Entre agora
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
