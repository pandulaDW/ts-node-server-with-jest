import { createServer } from "http";
import { Authorizer } from "../Authorization/Authorizer";
import { UserDBAccess } from "../Data/UserDBAccess";
import { DataHandler } from "../Handlers/DataHandler";
import { LoginHandler } from "../Handlers/LoginHandler";
import { Utils } from "../Utils/Utils";

export class Server {
  private authorizer: Authorizer = new Authorizer();
  private usersDBAccess: UserDBAccess = new UserDBAccess();

  public startServer() {
    createServer(async (req, res) => {
      const basePath = Utils.getRequestBasePath(req);
      switch (basePath) {
        case "login":
          await new LoginHandler(req, res, this.authorizer).handleRequest();
          break;
        case "users":
          const dataHandler = new DataHandler(
            req,
            res,
            this.authorizer,
            this.usersDBAccess
          );
          await dataHandler.handleRequest();
          break;
        default:
          break;
      }
      res.end();
    }).listen(8080);
    console.log("server started");
  }
}
