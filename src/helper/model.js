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
}

export function isUserLoggedIn() {  
  // check added for null
  const dataAvialable = !!localStorage.getItem("UserLoggedIn") ? localStorage.getItem("UserLoggedIn") : "false";
  return BOOLS[dataAvialable];
}

/*
 *  Since the sessionStorage will get cleared on browser closing therefore
 *  everytime when user is logged in and comes to our site
 *  for once we navigate him / her to profile page
 */
export function firstBrowserOpen() {
  const firstTimeOpenAfterLogin = sessionStorage.getItem("firstTimeOpenAfterLogin");
  // null check, hence when browser opened for the first time and if logged in then redirect
  if (!firstTimeOpenAfterLogin ) {
    sessionStorage.setItem("firstTimeOpenAfterLogin", 'any_random_value');
    return true;
  } 
  return false;
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
  // check added for null
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
