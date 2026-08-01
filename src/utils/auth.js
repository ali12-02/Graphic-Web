export const USERNAME = "admin";
export const PASSWORD = "admin123";

export const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

export const login = (username, password) => {
  if (username === USERNAME && password === PASSWORD) {
    localStorage.setItem("isLoggedIn", "true");
    return true;
  }

  return false;
};

export const logout = () => {
  localStorage.removeItem("isLoggedIn");
};