export const USER_ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
  DRIVER: "DRIVER",
  BRANCH: "BRANCH",
};
export const KEY_MAP = "AIzaSyCcdhrpyCJYTA-CSSjxnWLZEiJA7UFzWYM";

// PATCH URL
export const PAGE_URLS = {
  LOGIN: "/login",
  HOMEPAGE: "/",
  REGISTER: "/register",
  ADMIN: "/admin",
  BRANCH: "/branch",
  BUY_TICKET: "/buy-ticket",
  REGISTER_DRIVER: "/register-driver",
  BOOK_DRIVER: "/book-driver",
  OTP: "/otpPage",
  INFOR: "/inforPage",
  HISTORY: "/historypage",
  NAVIGATE_REGIS: "/navigateRegister",
  NAVIGATE_LOGIN: "/navigateLogin",
  PAYMENT: "/payment",
};
// check
// API
const BASE_API_URL = "";
export const API_AUTH = `${BASE_API_URL}/...`;

export const TOKEN = "token";
export const REFRESH_TOKEN = "refresh_token";

// status  = 2 driving .//  status = 0 waiting for confirm // . status =-1 . fail . // status = 1 waiting for driving // status = 3 success  ///
// 4 Waiting for report responsive
export const STATUS_TICKET = {
  WAITING_FOR_CONFIRM: 0,
  WAITING_FOR_DRIVING: 1,
  DRIVING: 2,
  SUCCESS: 3,
  WAITING_FOR_REPORT: 4,
  FAIL: -1,
};
export const KEY_API_MAP_GG = "AIzaSyCcdhrpyCJYTA-CSSjxnWLZEiJA7UFzWYM";
