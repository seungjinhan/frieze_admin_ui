import { SecurityUtils } from "../libs/security.utils";

export const ElseUtils = {
  isValidEmail: (email: string) => {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  },
  isAllUpperCase: (str: string) => {
    const regex = /^[A-Z\s]+$/;
    return regex.test(str);
  },
  truncateString: (str: string, num: number) => {
    if (str === undefined || str === null) return;
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  },

  stringCut: (str: string, size: number, add = "") => {
    if (str.length < size) {
      add = "";
    }
    return `${str.substring(0, size)}${add}`;
  },

  changeDateFromDBIsoDate: (isoDate: string) => {
    let date = new Date(isoDate);

    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based. Add leading 0.
    let day = ("0" + date.getDate()).slice(-2); // Add leading 0.

    let hours = ("0" + date.getHours()).slice(-2); // Add leading 0.
    let minutes = ("0" + date.getMinutes()).slice(-2); // Add leading 0.

    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDate;
  },
  changeDate: (str: string) => {
    let date = new Date(str);

    let year = date.getUTCFullYear();
    let month = String(date.getUTCMonth() + 1).padStart(2, "0");
    let day = String(date.getUTCDate()).padStart(2, "0");
    let hours = String(date.getUTCHours()).padStart(2, "0");
    let minutes = String(date.getUTCMinutes()).padStart(2, "0");

    let formatted = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formatted;
  },
  checkLoginUserAndGetUser: (isNotMove = false) => {
    const user = localStorage.getItem("managerinfomation");
    if (user === undefined || user === null) {
      location.href = "/login/LoginPage";
      return;
    }
    try {
      const userJson = JSON.parse(SecurityUtils.decryptText(user));
      if (isNotMove === false) {
        location.href = "/main/users/UserManagePage";
        return;
      }
      return userJson;
    } catch (err) {
      localStorage.removeItem("managerinfomation");
      location.href = "/login/LoginPage";
      return;
    }
  },
};
