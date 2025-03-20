import { Input } from "@/app/components/ui/input";
import SubmitButton from "@/app/components/signin/submit-button";

const SignUpForm = () => {
  return (
    <form className="flex flex-col gap-2.5">
      <Input placeholder="Nome" />

      <Input placeholder="Sobrenome" />

      <Input placeholder="Nome de usuário" />

      <Input placeholder="E-mail" />

      <Input placeholder="Senha" />

      <Input placeholder="Confirmação de senha" />

      <SubmitButton />
    </form>
  );
};

export default SignUpForm;
