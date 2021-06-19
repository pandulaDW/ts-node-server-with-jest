import { ServerResponse, IncomingMessage } from "http";
import { UserDBAccess } from "../Data/UserDBAccess";
import {
  TokenValidator,
  HTTP_METHODS,
  HTTP_CODES,
  AccessRight,
} from "../Models/ServerModels";
import { Utils } from "../Utils/Utils";

export class DataHandler {
  private request: IncomingMessage;
  private response: ServerResponse;
  private tokenValidator: TokenValidator;
  private usersDBAccess: UserDBAccess;

  public constructor(
    requst: IncomingMessage,
    response: ServerResponse,
    tokenValidator: TokenValidator,
    usersDBAccess: UserDBAccess
  ) {
    this.request = requst;
    this.response = response;
    this.tokenValidator = tokenValidator;
    this.usersDBAccess = usersDBAccess;
  }

  public async handleRequest() {
    switch (this.request.method) {
      case HTTP_METHODS.OPTIONS:
        await this.handleOptions();
        break;
      case HTTP_METHODS.GET:
        await this.handleGet();
        break;
      default:
        break;
    }
  }

  private async handleOptions() {
    this.response.writeHead(HTTP_CODES.OK);
  }

  private async handleGet() {
    try {
      const operationAuthorized = await this.operationAuthorized(
        AccessRight.READ
      );

      if (!operationAuthorized) {
        this.response.statusCode = HTTP_CODES.UNAUTHORIZED;
        this.response.write("Unauthorized operation!");
        return;
      }

      const parsedUrl = Utils.parseUrl(this.request.url!);
      const name = parsedUrl.searchParams.get("name");

      if (!name) {
        this.response.statusCode = HTTP_CODES.BAD_REQUEST;
        this.response.write("Missing name parameter in the request!");
        return;
      }

      const users = await this.usersDBAccess.getUserByName(name);
      this.response.writeHead(HTTP_CODES.OK, {
        "Content-Type": "application/json",
      });

      this.response.write(JSON.stringify(users));
    } catch (err) {
      this.response.statusCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
      this.response.write("Internal error: " + err.message);
    }
  }

  private async operationAuthorized(operation: AccessRight): Promise<boolean> {
    const tokenId = this.request.headers.authorization;

    if (tokenId) {
      const TokenRights = await this.tokenValidator.validateToken(tokenId);
      if (TokenRights.accessRights.includes(operation)) {
        return true;
      }
      return false;
    }

    return false;
  }
}
