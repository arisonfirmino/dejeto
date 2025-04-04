import { Input } from "@/app/components/ui/input";
import SubmitButton from "@/app/components/submit-button";

const SignInForm = () => {
  return (
    <form className="space-y-2.5 px-2.5">
      <Input placeholder="E-mail ou nome de usuário" />
      <Input type="password" placeholder="Senha" />
      <SubmitButton>Entrar</SubmitButton>
    </form>
  );
};

export default SignInForm;
