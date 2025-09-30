"use client";

import { Form } from "../ui/form";
import { StepIndicator } from "./components/step-indicator";
import { Step1Content } from "./components/step1-content";
import { Step2Content } from "./components/step2-content";
import { Step3Content } from "./components/step3-content";
import { NavigationButtons } from "./components/navigation-buttons";
import { useRegisterForm } from "./hooks/use-register-form";

// Re-export schemas for backward compatibility
export { registerSchema } from "./schemas/register-schemas";

// Configuração das etapas
const steps = [
  { number: 1, title: "Dados Básicos", description: "Nome, email e senha" },
  { number: 2, title: "Documentos", description: "CPF, CNPJ e telefone" },
  { number: 3, title: "Endereço", description: "Endereço completo" },
];

export function RegisterForm() {
  const { formData, currentStep, isPending, nextStep, prevStep, onSubmit } =
    useRegisterForm();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Content control={formData.control} />;
      case 2:
        return <Step2Content control={formData.control} />;
      case 3:
        return <Step3Content control={formData.control} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-9">
        <h1 className="mb-2 text-2xl font-bold text-white">Criar conta</h1>
        <p className="text-gray-400">
          Crie sua conta e tenha acesso a todos os benefícios
        </p>
      </div>

      <StepIndicator currentStep={currentStep} steps={steps} />

      <Form {...formData}>
        <form onSubmit={formData.handleSubmit(onSubmit)} className="w-full">
          {renderStepContent()}

          <NavigationButtons
            currentStep={currentStep}
            totalSteps={steps.length}
            isPending={isPending}
            acceptTerms={formData.watch("acceptTerms")}
            onPrevious={prevStep}
            onNext={nextStep}
          />
        </form>
      </Form>
    </div>
  );
}
