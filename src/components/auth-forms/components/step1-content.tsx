import { FormField, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Control } from "react-hook-form";
import { RegisterFormData } from "../schemas/register-schemas";

interface Step1ContentProps {
  control: Control<RegisterFormData>;
}

export function Step1Content({ control }: Step1ContentProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="fullname"
        render={({ field }) => (
          <div className="grid gap-2">
            <FormControl>
              <Input
                {...field}
                id="fullname"
                type="text"
                placeholder="Nome completo"
                className="text-secondary w-full border-0 bg-zinc-900 px-4 py-5"
                autoComplete="name"
              />
            </FormControl>
            <FormMessage />
          </div>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <div className="grid gap-2">
            <FormControl>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="nome@exemplo.com"
                className="text-secondary w-full border-0 bg-zinc-900 px-4 py-5"
                autoComplete="email"
              />
            </FormControl>
            <FormMessage />
          </div>
        )}
      />

      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <div className="grid gap-2">
            <FormControl>
              <PasswordInput
                {...field}
                id="password"
                placeholder="Senha"
                className="text-secondary border-0 bg-zinc-900 px-4 py-5"
                autoComplete="new-password"
              />
            </FormControl>
            <FormMessage />
          </div>
        )}
      />

      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <div className="grid gap-2">
            <FormControl>
              <PasswordInput
                {...field}
                id="password-confirm"
                placeholder="Confirme sua senha"
                className="text-secondary border-0 bg-zinc-900 px-4 py-5"
                autoComplete="new-password"
              />
            </FormControl>
            <FormMessage />
          </div>
        )}
      />
    </div>
  );
}
