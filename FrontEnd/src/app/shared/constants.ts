export const APP = {
  NAME: 'NK Storify',
  LOGO: 'assets/images/logo-app.png',
};

export const PAGE = {
  ADMIN: {
    URL: 'admin',
    TITLE: 'Admin',
  },
  EMPLOYEE: {
    URL: 'staff',
    TITLE: 'Staff',
    ICON: 'fas fa-users',
  },
  MERCHANDISE: {
    URL: 'merchandise',
    TITLE: 'Merchandise',
    ICON: 'fas fa-shopping-bag',
  },
  CUSTOMER: {
    URL: 'client',
    TITLE: 'Client',
    ICON: 'fas fa-user',
  },
  REPORT: {
    URL: 'report',
    TITLE: 'Report',
    ICON: 'fas fa-flag',
  },
  DASHBOARD: {
    URL: 'dashboard',
    TITLE: 'Dashboard',
    ICON: 'fas fa-user-secret',
  },
  CATEGORY: {
    URL: 'category',
    TITLE: 'Category',
    ICON: 'fas fa-folder',
  },
  PAYMENT: {
    URL: 'payment',
    TITLE: 'Payment',
    ICON: 'fas fa-credit-card',
  },
  IMPORT: {
    URL: 'import',
    TITLE: 'Import Merchandise',
    ICON: 'fas fa-warehouse',
  },
  STORE: {
    URL: 'store',
    TITLE: 'Store',
    ICON: 'fas fa-store',
  },
  BILL: {
    URL: 'bill',
    TITLE: 'Bill',
    ICON: 'fas fa-clipboard-list',
  },
  SETTING: {
    URL: 'setting',
    TITLE: 'Setting',
    ICON: 'fas fa-cog',
  },
};

export const ROLE = {
  SUPER_ADMIN: {
    KEY: 'super_admin',
    TITLE: 'Super Admin',
    LEVEL: 16,
  },
  OWNER: {
    KEY: 'general_manager',
    TITLE: 'General Manager',
    LEVEL: 8,
  },
  // TEMPORARILY DISABLE THE BELOW UNTIL WE FINISH ALL OTHER THINGS
  // AREA_MANAGER: {
  //   KEY: 'area_manager',
  //   TITLE: 'Area Manager',
  //   LEVEL: 4,
  // },
  MANAGER: {
    KEY: 'admin',
    TITLE: 'Manager',
    LEVEL: 2,
  },
  STAFF: {
    KEY: 'employee',
    TITLE: 'Staff',
    LEVEL: 1,
  },
};

export const API = {
  ROOT: 'https://dptore.herokuapp.com',
  BYPASS: 'https://bypasscors.herokuapp.com/api/?url=',
};
