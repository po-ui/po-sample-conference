export interface AuthUser {
  username: string;
  password: string;
}

export interface AuthJWT {
  access_token: string;
}

export interface UserJWT {
  id: string;
  username: string;
  isSuperUser: boolean;
}
