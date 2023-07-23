export type TUser = {
  id?: number;
  sub?: string;
  name?: string;
  email?: string;
};

export type TDecodedToken = {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
} & TUser;
