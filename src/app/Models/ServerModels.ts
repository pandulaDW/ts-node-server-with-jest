export interface OperationState {
  authorized: boolean;
  tokenState: TokenState;
}

export interface SessionToken {
  tokenId: string;
  userName: string;
  valid: boolean;
  expirationTime: Date;
  accessRights: AccessRight[];
}

export interface TokenRights {
  accessRights: AccessRight[];
  state: TokenState;
}

export interface UserCredentials extends Account {
  accessRights: AccessRight[];
}

export interface Account {
  username: string;
  password: string;
}

export interface TokenGenerator {
  generateToken(account: Account): Promise<SessionToken | null>;
}

export interface TokenValidator {
  validateToken(tokenId: string): Promise<TokenRights>;
}

export enum TokenState {
  VALID,
  INVALID,
  EXPIRED,
}

export enum AccessRight {
  CREATE,
  READ,
  UPDATE,
  DELETE,
}
