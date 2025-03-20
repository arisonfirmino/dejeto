import { Input } from "@/app/components/ui/input";
import SubmitButton from "@/app/components/signin/submit-button";

const SignInForm = () => {
  return (
    <form className="flex flex-col gap-2.5">
      <Input placeholder="E-mail ou nome de usuário" />

      <Input placeholder="Senha" />

      <SubmitButton />
    </form>
  );
};

export default SignInForm;
