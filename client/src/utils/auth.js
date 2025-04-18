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

// Remove token + user
export const removeToken = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
};

// Save user
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Get user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Get individual user fields (optional helpers)
export const getUserName = () => getUser()?.name || "User";
export const getUserEmail = () => getUser()?.email || "";
export const getUserPhone = () => getUser()?.phone || "";
export const getUserId = () => getUser()?.id || null;
