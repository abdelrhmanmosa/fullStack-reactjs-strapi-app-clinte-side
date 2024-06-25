import Cookies from "universal-cookie";

const cookies = new Cookies();

class CookieServices {
  //* get
  get(name) {
    return cookies.get(name);
  }
  //* set
  set(name, value, option) {
    return cookies.set(name, value, option);
  }
  //* remove
  remove(name) {
    return cookies.remove(name);
  }
}
export default new CookieServices();
