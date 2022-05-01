import fs from "fs";

export default (msg: any) => {
  let log = fs.readFileSync("./dev-utils/log.txt", "utf8");

  log += "\n" + (typeof msg === "object" ? JSON.stringify(msg) : msg);

  fs.writeFileSync("./dev-utils/log.txt", log);

  console.log(typeof msg);
};
