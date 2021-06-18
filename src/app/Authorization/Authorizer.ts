import { SessionTokenDBAccess } from "./SessionTokenDBAccess";
import { UserCredentialsDbAccess } from "./UserCredentialsDbAccess";
import {
  TokenGenerator,
  TokenValidator,
  Account,
  SessionToken,
  TokenRights,
  TokenState,
} from "../Models/ServerModels";

export class Authorizer implements TokenGenerator, TokenValidator {
  private sessionTokenDBAccess: SessionTokenDBAccess;
  private userCredentialsDBAccess: UserCredentialsDbAccess;

  public constructor(
    sessionTokenDBAccess = new SessionTokenDBAccess(),
    userCredentialsDBAccess = new UserCredentialsDbAccess()
  ) {
    this.sessionTokenDBAccess = sessionTokenDBAccess;
    this.userCredentialsDBAccess = userCredentialsDBAccess;
  }

  async generateToken(account: Account): Promise<SessionToken | null> {
    const resultAccount = await this.userCredentialsDBAccess.getUserCred(
      account.username,
      account.password
    );

    if (!resultAccount) return null;

    const token: SessionToken = {
      accessRights: resultAccount.accessRights,
      expirationTime: this.generateExpirationTime(),
      userName: resultAccount.username,
      valid: true,
      tokenId: this.generateRandomTokenId(),
    };

    await this.sessionTokenDBAccess.storeSessionToken(token);
    return token;
  }

  async validateToken(tokenId: string): Promise<TokenRights> {
    const token = await this.sessionTokenDBAccess.getToken(tokenId);

    if (!token || !token.valid)
      return { accessRights: [], state: TokenState.INVALID };

    if (token.expirationTime < new Date())
      return { accessRights: [], state: TokenState.EXPIRED };

    return { accessRights: token.accessRights, state: TokenState.VALID };
  }

  private generateExpirationTime() {
    return new Date(Date.now() + 60 * 60 * 1000);
  }

  private generateRandomTokenId() {
    return Math.random().toString(36).slice(2);
  }
}
