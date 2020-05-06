import faker from 'faker'
import { Response, Request } from 'express'
import { IRoleData } from '../../src/api/types'

const roles: Array<IRoleData> = [
  {
    key:'admin',
    name:'admin',
    description:'admin'
  },{
    key:'editor',
    name:'editor',
    description:'editor'
  },{
    key:'visitor',
    name:'visitor',
    description:'visitor'
  },
]

export const getRoles = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    data: roles
  })
}