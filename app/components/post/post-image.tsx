import Image from "next/image";

const PostImage = ({ image }: { image: string }) => {
  return (
    <div className="bg-card relative flex aspect-square w-full items-center justify-center overflow-hidden rounded">
      <Image
        src={image}
        alt={image}
        height={0}
        width={0}
        sizes="100vw"
        className="absolute w-full"
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default PostImage;
