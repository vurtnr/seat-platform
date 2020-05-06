import faker from "faker";
import { Response, Request } from "express";
import { IUserData } from '../src/api/types'

const userList: IUserData[] = [
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
    status:1
  },{
    id: 1,
    username: 'editor',
    password: '123456',
    name: 'Normal Editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am an editor',
    email: 'editor@test.com',
    phone: '1234567890',
    roles: ['editor'],
    status:2
  }
];

const userCount = 100

for (let i = 2; i < userCount; i++) {
  userList.push({
    id: i,
    username: 'user_' + faker.random.alphaNumeric(9),
    password: faker.random.alphaNumeric(20),
    name: faker.name.findName(),
    avatar: faker.image.imageUrl(),
    introduction: faker.lorem.sentence(20),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    roles: ['visitor'],
    status: faker.random.arrayElement([1, 2, 3]),
  })
}

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

export const getUsers = (req: Request, res: Response) => {
  const { status, name, page = 1, limit = 20, sort } = req.query

  let users = userList.filter(user => {
    if (status && user.status !== status ) return false
    if (name && user.name !== name) return false
    return true
  })
  console.log("users.length = ", users.length)
  if (sort === '-id') {
    users = users.reverse()
  }
  const pageList = users.filter((_, index) => index < limit * page && index >= limit * (page - 1))
  return res.json({
    code: 20000,
    data: {
      items: pageList,
      total: users.length
    }
  })
}

export const getUserInfo = (req: Request, res: Response) => {
  // Mock data based on access token
  return res.json({
    code: 20000,
    data: {
      user: req.header('X-Access-Token') == 'admin-token' ? userList[0] : userList[1]
    }
  })
}