import faker from "faker";
import { Response, Request } from "express";
import { UserData } from "../src/api/types";

const userList: UserData[] = [
  {
    id: 0,
    username: "admin",
    password: "123456",
    name: "Super Admin",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    introduction: "I am a super administrator",
    email: "admin@test.com",
    phone: "1234567890",
    roles: ["admin"],
  },
];

export const login = (req: Request, res: Response) => {
  const { username } = req.body
  for (const user of userList) {
    if (user.username === username) {
      console.log('success')
      return res.json({
        code: 20000,
        data: {
          accessToken: username + "-token",
        },
      });
    }
    return res.status(400).json({
      code: 50004,
      message: "Invalid User",
    });
  }
};

export const getUserInfo = (req: Request, res: Response) => {
  // Mock data based on access token
  return res.json({
    code: 20000,
    data: {
      user: req.header('X-Access-Token') == 'admin-token' ? userList[0] : userList[1]
    }
  })
}