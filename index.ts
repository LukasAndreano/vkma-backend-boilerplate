import * as dotenv from "dotenv";

// Make .env readable
dotenv.config();

import * as express from "express";
import * as bodyParser from "body-parser";
import * as fileUpload from "express-fileupload";
import * as cors from "cors";

import response from "./utils/response";

import paramsMiddleware from "./middleware/params";
import adminMiddleware from "./middleware/admin";

import * as routes from "./routes.json";
import { Application, Request, Response } from "express";

const app: Application = express();

app.use(cors());
app.use(
  fileUpload({
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Make handler globally
app.use((req: Request, res: Response, next) => {
  res.reply = new response(res);

  next();
});

app.use(paramsMiddleware);
app.use(adminMiddleware);

// Nginx proxy
app.set("trust proxy", 1);

routes["v1"].forEach((el) => {
  app.use(el.url, require(el.path));
});

// Route is not exists
app.use((req: Request, res: Response) => res.reply.error(1, 404));

(async () => {
  app.listen(process.env.PORT, () => {
    console.log(`[Log] Server started on port ${process.env.PORT}`);
  });
})();
