export const checkParameters = (params) => {
  console.log("Hello");
  return params.every((param) => param !== undefined && param !== null);
};
