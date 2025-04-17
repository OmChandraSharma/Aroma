// Save token
export const saveToken = (token) => {
  localStorage.setItem("jwtToken", token);
};

// Get token
export const getToken = () => {
  return localStorage.getItem("jwtToken");
};

// Check if token exists
export const isLoggedIn = () => {
  return !!localStorage.getItem("jwtToken");
};

// Optional: remove token
export const removeToken = () => {
  localStorage.removeItem("jwtToken");
};
