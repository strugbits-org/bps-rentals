export const checkParameters = (params) => {
  return params.every((param) => param !== undefined && param !== null);
};
