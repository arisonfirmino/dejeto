import { Button } from "@/app/components/ui/button";

interface SubmitButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  isLoading: boolean;
}

const SubmitButton = ({ children, disabled, isLoading }: SubmitButtonProps) => {
  return (
    <Button disabled={disabled || isLoading} className="w-full">
      {isLoading ? "Carregando" : children}
    </Button>
  );
};

export default SubmitButton;
