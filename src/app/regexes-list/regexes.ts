export const strongPasswordRegexpSchema: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export const emailRegexpSchema: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
