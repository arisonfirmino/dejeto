import { Button } from "@/app/components/ui/button";

const SubmitButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Button type="submit" disabled={isLoading} className="w-full">
      {isLoading ? "Carregando" : "Continuar"}
    </Button>
  );
};

export default SubmitButton;
