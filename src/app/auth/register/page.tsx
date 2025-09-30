import { RegisterForm } from "@/components/auth-forms/register-form";
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

      {/* Registration Link */}
      <div className="mt-6 w-full text-center text-sm">
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
