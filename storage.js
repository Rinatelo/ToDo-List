export function setItemAsync(key, value) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        localStorage.setItem(key, value);
        resolve();
      }, 0);
    } catch (error) {
      reject(error);
    }
  });
}

export function getItemAsync(key) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const value = localStorage.getItem(key);
        resolve(value);
      }, 0);
    } catch (error) {
      reject(error);
    }
  });
}
