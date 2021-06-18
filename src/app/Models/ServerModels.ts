export interface OperationState {
  authorized: boolean;
  tokenState: TokenState;
}

export interface SessionToken {
  tokenId: string;
  userName: string;
  valid: boolean;
  expirationTime: Date;
  accessRights: AccessRight;
}

export interface TokenRights {
  accessRights: AccessRight[];
  state: TokenState;
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
