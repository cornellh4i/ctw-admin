import { Request, Response, NextFunction } from "express";
import { getAuth } from "firebase-admin/auth";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers
  if (!authorization) {
    console.log(req.headers)
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const token = authorization.split(" ")[1];

  getAuth()
  .verifyIdToken(token)
  .then((claims) => {
      if (claims.evaluator === true || claims.admin === true) {
          next();
        }
    })
  .catch((err) => res.sendStatus(403).send({ message: 'Forbidden' }))
  };