const LikeCount = ({ count }: { count: number }) => {
  return (
    <p className="text-sm lowercase">
      Curtido por <span className="font-medium">{count}</span>{" "}
      {count === 1 ? "pessoa" : "pessoas"}
    </p>
  );
};

export default LikeCount;
