import { FormField, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Control } from "react-hook-form";
import { RegisterFormData } from "../schemas/register-schemas";

interface Step3ContentProps {
  control: Control<RegisterFormData>;
}

export function Step3Content({ control }: Step3ContentProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="street"
        render={({ field }) => (
          <div className="grid gap-2">
            {/* <FormLabel className="text-white">Rua</FormLabel> */}
            <FormControl>
              <Input
                {...field}
                type="text"
                placeholder="Logradouro"
                className="text-secondary w-full border-0 bg-zinc-900 px-4 py-5"
              />
            </FormControl>
            <FormMessage />
          </div>
        )}
      />

      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={control}
          name="number"
          render={({ field }) => (
            <div className="grid gap-2">
              {/* <FormLabel className="text-white">Número</FormLabel> */}
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Número"
                  className="text-secondary w-full border-0 bg-zinc-900 px-4 py-5"
                />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />

        <FormField
          control={control}
          name="complement"
          render={({ field }) => (
            <div className="grid gap-2">
              {/* <FormLabel className="text-white">Complemento</FormLabel> */}
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Complemento"
                  className="text-secondary w-full border-0 bg-zinc-900 px-4 py-5"
                />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />

        <FormField
          control={control}
          name="neighborhood"
          render={({ field }) => (
            <div className="grid gap-2">
              {/* <FormLabel className="text-white">Bairro</FormLabel> */}
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Bairro"
                  className="text-secondary w-full border-0 bg-zinc-900 px-4 py-5"
                />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <div className="grid gap-2">
              {/* <FormLabel className="text-white">Cidade</FormLabel> */}
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Cidade"
                  className="text-secondary w-full border-0 bg-zinc-900 px-4 py-5"
                />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />

        <FormField
          control={control}
          name="state"
          render={({ field }) => (
            <div className="grid gap-2">
              {/* <FormLabel className="text-white">Estado</FormLabel> */}
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Estado"
                  className="text-secondary w-full border-0 bg-zinc-900 px-4 py-5"
                  maxLength={2}
                />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="cep"
          render={({ field }) => (
            <div className="col-span-2 grid gap-2">
              {/* <FormLabel className="text-white">CEP</FormLabel> */}
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="CEP"
                  className="text-secondary w-full border-0 bg-zinc-900 px-4 py-5"
                  maxLength={9}
                  onChange={(e) => {
                    // Simple CEP mask
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 8) {
                      value = value.replace(/(\d{5})(\d{3})/, "$1-$2");
                      field.onChange(value);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />
      </div>

      <Separator className="my-6 bg-zinc-800" />

      <FormField
        control={control}
        name="acceptTerms"
        render={({ field }) => (
          <div className="grid gap-2">
            <FormControl>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <label
                  htmlFor="terms"
                  className="cursor-pointer text-sm text-gray-400"
                >
                  Eu aceito os{" "}
                  <Link
                    href="/termos-e-condicoes"
                    className="text-white underline underline-offset-4 hover:text-gray-300"
                  >
                    Termos & Condições
                  </Link>
                </label>
              </div>
            </FormControl>
            <FormMessage />
          </div>
        )}
      />
    </div>
  );
}
