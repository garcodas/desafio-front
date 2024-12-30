import Cookies from "js-cookie";
const getCookie = (key: string) => {
  return Cookies.get(key);
};

const setCookie = (
  key: string,
  value: string,
  options?: Cookies.CookieAttributes
) => {
  return Cookies.set(key, value, options);
};

const removeCookie = (key: string) => {
  return Cookies.remove(key);
};

export { getCookie, setCookie, removeCookie };
