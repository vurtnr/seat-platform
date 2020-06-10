export interface IUserData {
  id: number
  username: string
  password: string
  merchantId?: number
  checkPassword?: string
  name: string
  email: string
  phone: string
  avatar: string
  roles: string[]
  introduction: string
  status: number | null
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes?: any
}

export interface IMerchantsData {
  id: number
  name: string
  address: string
  phone: string
  email: string
  businessLicense: string
  photo?: Array<string>
  peoples?: Array<IUserData>
}

export interface IParams {
  id: number
  model: string
  name: string
  status: number | null
  desc: string
}
