export interface user {
  userEmail:    string;
  password:     string;
  active:       boolean;
  role: string;
  userId:       string;
}

export interface roles {
  roleId:      number;
  rolename:    string;
  description: string;
}
