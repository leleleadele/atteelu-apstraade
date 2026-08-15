const CornerTag = ({ label }) => {
  return (
    <h2 className="absolute top-5 left-5 z-10 m-0 rounded bg-black/50 p-2">
      {label}
    </h2>
  );
};

export default CornerTag;
