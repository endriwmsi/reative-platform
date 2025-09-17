import { LoginForm } from "@/components/forms/login-form";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <div className="flex flex-col mt-8">
      <LoginForm />

      {/* Social Login Section */}
      <div className="w-full mt-6">
        <div className="relative flex w-full items-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <div className="mx-4 text-sm text-gray-400 px-2">Ou entrar com</div>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <div className="w-full flex gap-2 mt-4">
          <Button className="text-xs w-1/2">Google</Button>
          <Button className="text-xs w-1/2">Facebook</Button>
        </div>
      </div>

      {/* Registration Link */}
      <div className="mt-6 text-center text-sm w-full max-w-sm">
        <span className="text-gray-400">Ainda não tem uma conta? </span>
        <a
          href="#"
          className="text-white underline underline-offset-4 hover:text-gray-300"
        >
          Crie uma aqui
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
