import { IProduction } from './production'

export {
  IDevelopmentBoard,
  IAccesoryInterface,
  IAccesoriesItem,
  IAccessoriesPro,
  IAccessories,
  IProduction
} from './production'

export interface IBase {
  messageType?: string
}

export interface IParams extends IBase {
  productId: number
}

export interface IBoardParams extends IBase {
  id: number
}

export interface IAccessoriesParams extends IBase {
  accessoryTypeId: number
  needAccessoryDetail?: boolean
  page: number
  pageSize: number
}

export interface IPageation extends IBase {
  needAccessoryInterface?: boolean
  page: number
  pageSize: number
}
