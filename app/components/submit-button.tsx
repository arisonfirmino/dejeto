import { Button } from "@/app/components/ui/button";

interface SubmitButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const SubmitButton = ({ children, isLoading }: SubmitButtonProps) => {
  return (
    <Button className="w-full">{isLoading ? "Carregando" : children}</Button>
  );
};

export default SubmitButton;
