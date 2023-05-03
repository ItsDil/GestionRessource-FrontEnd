export interface User {
  firstname:string;
  lastname:string;
  email:    string;
  password:     string;
  roles: Array<roles>;
  id: number | null;
}

export interface roles {
  roleID:      number|{};
  rolename:    string;
}
