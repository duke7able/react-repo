/*
 * Helper methods not so react way but just providing abstraction
 */
/*
 *  freezing the object to make it immutable
 *  also its better and faster to handle the booleans that are coming as string
 *  from localstorage like this than doing string comparision
 */
export const BOOLS = Object.freeze({
  true: true,
  false: false
});

export function setLogin(isLogin) {
  localStorage.setItem("UserLoggedIn", isLogin);
  return true;
}

export function isUserLoggedIn() {
  return BOOLS[localStorage.getItem("UserLoggedIn")];
}

/*
 *  just need to change this and make this a post request to save data on server when we have server
 *  @param key is the key : DOM string
 *  @param value is the value that gets stored : DOM string
 */
export function setData(key, value) {
  const stringifyData = JSON.stringify(value);
  localStorage.setItem(key, stringifyData);
}

export function getData(key) {
  const parseData = localStorage.getItem(key);
  return !!parseData && JSON.parse(parseData);
}

export function login(credentials) {
  const loggedIn = new Promise((resolve, reject) => {
    // never store static username password, this just for this case
    if (
      credentials.identifier === "admin@admin.com" &&
      credentials.password === "admin@123"
    ) {
      setLogin(true);
      resolve("success");
    } else {
      let errorMessage = {};
      errorMessage.form = "Invalid email / password";
      reject(errorMessage);
    }
  });
  return loggedIn;
}
