const TOKEN_KEY = "token";
exports.getToken = () => localStorage.getItem(TOKEN_KEY);
exports.setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
exports.removeToken = () => localStorage.removeItem(TOKEN_KEY);
