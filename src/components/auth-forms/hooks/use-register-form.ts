import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  registerSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  RegisterFormData,
} from "../schemas/register-schemas";
import { signUpEmailAction } from "@/actions/auth/sign-up-email.action";

export function useRegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const formData = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      cpf: "",
      cnpj: "",
      phone: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      cep: "",
      acceptTerms: false,
    },
  });

  const validateCurrentStep = async () => {
    const values = formData.getValues();
    let isValid = false;

    try {
      switch (currentStep) {
        case 1:
          await step1Schema.parseAsync({
            fullname: values.fullname,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
          });
          isValid = true;
          break;
        case 2:
          await step2Schema.parseAsync({
            cpf: values.cpf,
            cnpj: values.cnpj,
            phone: values.phone,
          });
          isValid = true;
          break;
        case 3:
          await step3Schema.parseAsync({
            street: values.street,
            number: values.number,
            complement: values.complement,
            neighborhood: values.neighborhood,
            city: values.city,
            state: values.state,
            cep: values.cep,
          });
          isValid = true;
          break;
      }
    } catch (error) {
      // Triggering form validation to show errors
      await formData.trigger();
      isValid = false;
    }

    return isValid;
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (values: RegisterFormData) => {
    setIsPending(true);

    console.log(values);

    const { error } = await signUpEmailAction(values);
    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success(
        "Usuário cadastrado com sucesso. Por favor, verifique seu e-mail para continuar."
      );
      router.push("/auth/register/success");
    }
  };

  return {
    formData,
    currentStep,
    isPending,
    nextStep,
    prevStep,
    onSubmit,
  };
}
