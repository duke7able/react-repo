/*
 * Helper methods not so react way but just providing abstraction
 */

import PersistentStore from 'persistent-storage';
import StorageShim from 'node-storage-shim';
/*
 *  freezing the object to make it immutable
 *  also its better and faster to handle the booleans that are coming as string
 *  from localstorage like this than doing string comparision
 */
export const BOOLS = Object.freeze({
  true: true,
  false: false
});

const STORE = new PersistentStore({
  useCompression: false, 
  storageBackend: new StorageShim()
})

export function setLogin(isLogin) {
  STORE.setItem("UserLoggedIn",isLogin);
  // localStorage.setItem("UserLoggedIn", isLogin);
  return true;
}

export function isUserLoggedIn() {
  return BOOLS[STORE.getItem("UserLoggedIn")];
}

/*
 *  just need to change this and make this a post request to save data on server when we have server
 *  @param key is the key : DOM string
 *  @param value is the value that gets stored : DOM string
 */
export function setData(key, pair) {
  localStorage.setItem(key, pair);
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
