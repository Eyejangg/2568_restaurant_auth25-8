import jwt, { verify } from "jsonwebtoken";
import authConfig from "../config/auth.config";
import db from "../models/index.js";
const user = db.User; // model user เราสนใจแค่ model user

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    // req header Token
    return res.status(403).send({ message: "No Token Provided!" }); // https status code  403  // 403 คือ ไม่อนุญาติ
  }
  // ส่งมาแล้ว token
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      // ถ้าเกิด error Token ใครมาปลอมแปลงนั้นแหละไม่ผ่าน
      return res.status(401).send({ message: "Unauthorized" }); // ไม่ผ่านการตรวจสอบ
    }
    req.username = decoded.username; // req.userid // decoded มาจากการ decode token
    next(); // ผ่านการตรวจสอบแล้วไป middleware ตัวถัดไป
  });
};

const isAdmin = (req, res, next) => {
  // เรา set primaryKey ของ user เป็น id
  user.findByPk(req.username).then((user) => {
    user.getRoles().then((roles) => { // user model จะมี method getRoles มาให้เลย
      for (let i = 0; i < roles.length; i++) { //   วน loop ดูว่า roles มีอะไรบ้าง
        if (roles[i].name === "admin") { // admin ต้องตรงกับใน db
          next(); // ถ้าใช่ก็ผ่าน
          return;
        }
      }
      return res
        .status(401)
        .send({ message: "Unauthorized access, require Admin Role!" });
    });
  });
};

const authJwt = { verifyToken, isAdmin }; // export object
export default authJwt;
