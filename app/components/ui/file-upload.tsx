import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

import { ImageIcon } from "lucide-react";

import { resizeImage } from "@/app/helpers/resizeImage";

interface FileUploadProps {
  image: File | null;
  setImage: (value: File | null) => void;
}

const FileUpload = ({ image, setImage }: FileUploadProps) => {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const resizedImage = await resizeImage(file);
      setImage(resizedImage);
    }
  };

  return (
    <>
      <label
        htmlFor="file-upload"
        className={cn(buttonVariants({ variant: "outline" }), "w-full")}
      >
        {image ? (
          <span className="max-w-40 truncate" style={{ direction: "rtl" }}>
            {image.name}
          </span>
        ) : (
          <>
            <ImageIcon />
            Escolha um arquivo
          </>
        )}
      </label>
      <Input
        id="file-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
};

export default FileUpload;
