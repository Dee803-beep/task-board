export function loginService(email, password) {
  if (email === "intern@demo.com" && password === "intern123") {
    return { success: true, user: { email } };
  }
  return { success: false, message: "Invalid login." };
}

export function logoutService() {
  localStorage.removeItem("auth_user");
}
