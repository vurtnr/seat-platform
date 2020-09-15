import request from '@/utils/request'
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCT_REQUEST,
  GET_DEVELOPMENT_BOARDS_REQUEST,
  GET_DEVELOPMENT_BOARD_REQUEST,
  GET_ACCESSORIES_REQUEST,
  SET_PRODUCT_REQUEST,
  GET_PRODUCT_DEFINITION_REQUEST
} from '@/utils/messageType'
import {
  IParams,
  IBoardParams,
  IPageation,
  IAccessories
} from '@/interface/index'

export const getList = (data: IPageation) => {
  Object.assign(data, { messageType: GET_PRODUCTS_REQUEST })
  return request({
    url: '/dev-api/user/products',
    method: 'post',
    data
  })
}

export const saveProduct = (data: any) => {
  Object.assign(data, { messageType: SET_PRODUCT_REQUEST })
  return request({
    url: '/dev-api/user/product/save',
    method: 'post',
    data
  })
}

export const getProductInfo = (data: IParams) => {
  Object.assign(data, { messageType: GET_PRODUCT_REQUEST })
  return request({
    url: '/dev-api/user/product',
    method: 'post',
    data
  })
}

export const getDevelopmentBoards = (data: IPageation) => {
  Object.assign(data, {
    messageType: GET_DEVELOPMENT_BOARDS_REQUEST,
    needAccessoryInterface: true
  })
  return request({
    url: '/dev-api/development_boards',
    method: 'post',
    data
  })
}
export const getDevelopmentBoard = (data: IBoardParams) => {
  Object.assign(data, {
    messageType: GET_DEVELOPMENT_BOARD_REQUEST
  })
  return request({
    url: '/dev-api/development_board',
    method: 'post',
    data
  })
}

export const getAccessories = (data: IAccessories) => {
  Object.assign(data, {
    messageType: GET_ACCESSORIES_REQUEST,
    needAccessoryDetail: true
  })
  return request({
    url: '/dev-api/accessories',
    method: 'post',
    data
  })
}

export const getProductDefinition = (data: any) => {
  Object.assign(data, {
    messageType: 'GET_PRODUCT_DEFINITION_REQUEST'
  })
  return request({
    url: '/dev-api/product/definition',
    method: 'post',
    data
  })
}
