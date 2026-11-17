// function getToken() {
//   return localStorage.getItem("accessToken");
// }

// function getUserRole() {
//     const user = JSON.parse(localStorage.getItem("user"));
//     return user?.userRole;
// }

// function requiredLogin() {
//   const token = getToken();
//   if (!token && token == null) {
//     window.localtion.href = "/login.html";
//     return false;
//   }
//   return true;
// }


// function requireRole(requiredRole) {
//   if (!requiredLogin()) {
//     return false;
//   }
//   const role = getUserRole();
//   if (role !== requiredRole) {
//     window.location.href = "/unauthorized.html";
//     return false;
//   }
//   return true;
// }
// function logout() {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("userRole");

//     window.location.href = "/login.html";
// }
// function login(user, accessToken) {
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("user", JSON.stringify(user));
// }
// function logout() {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user");

//     window.location.href = "/login.html";
// }