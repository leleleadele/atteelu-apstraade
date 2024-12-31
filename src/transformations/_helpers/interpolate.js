// topLeft, topRight, bottomLeft, bottomRight - pikseļu vērtības

const interpolate = (
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  alpha,
  beta
) => {
  return (
    (1 - alpha) * (1 - beta) * topLeft +
    alpha * (1 - beta) * topRight +
    (1 - alpha) * beta * bottomLeft +
    alpha * beta * bottomRight
  );
};

export default interpolate;
