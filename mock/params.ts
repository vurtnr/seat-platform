import faker from "faker";
import { Response, Request } from "express";
import { IParams } from '../src/api/types'

const paramsArray : Array<IParams> = [];

const count = 3

for (let i = 0; i < count; i++) {
  paramsArray.push({
    id: i,
    model: faker.random.uuid(),
    name: faker.name.findName(),
    status: faker.random.arrayElement([1, 3]),
    desc: faker.lorem.lines()
  })
}

export const getParams = (req: Request,res:Response) => {
  const { status, name, page = 1, limit = 20, sort } = req.query
  let params = paramsArray.filter(param => {
    if (status && param.status !== status) return false
    if (name && param.name !== name) return false
    return true
  })
  if (sort === '-id') {
    params = params.reverse()
  }
  const pageList = params.filter((_, index) => index < limit * page && index >= limit * (page - 1))
  return res.json({
    code: 20000,
    data: {
      items: pageList,
      total: params.length
    }
  })
}