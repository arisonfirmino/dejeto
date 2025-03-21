export const formatLink = (url: string) => {
  return url.replace(/(^\w+:\/\/)|(^www\.)|(\/$)/g, "");
};
