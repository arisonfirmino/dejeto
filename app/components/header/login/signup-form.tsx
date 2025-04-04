import { Input } from "@/app/components/ui/input";
import SubmitButton from "@/app/components/submit-button";

const SignUpForm = () => {
  return (
    <form className="space-y-2.5 px-2.5">
      <div className="flex gap-2.5">
        <Input placeholder="Nome" />
        <Input placeholder="Sobrenome" />
      </div>

      <div className="flex gap-2.5">
        <Input placeholder="Nome de usuário" />
        <Input placeholder="E-mail" />
      </div>

      <Input type="password" placeholder="Senha" />

      <Input type="password" placeholder="Confirmação de senha" />

      <SubmitButton>Cadastrar</SubmitButton>
    </form>
  );
};

export default SignUpForm;
