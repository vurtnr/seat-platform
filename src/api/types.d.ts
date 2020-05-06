export interface IUserData {
  id: number
  username: string
  password: string
  checkPassword?:string,
  name: string
  email: string
  phone: string
  avatar: string
  roles: string[]
  introduction: string,
  status: number | null
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes?:any
}