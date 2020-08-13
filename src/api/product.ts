import request from "@/utils/request";
import {
  GET_PRODUCTS_REQUEST,
  GET_DEVELOPMENT_BOARDS_REQUEST,
  GET_DEVELOPMENT_BOARD_REQUEST,
  GET_ACCESSORIES_REQUEST,
} from "@/utils/messageType";
import {
  IProductOriginal,
  IParams,
  IBoardParams,
  IPageation,
  IAccessories,
} from "@/interface/index";

export const getList = (data: IPageation) => {
  Object.assign(data, { messageType: GET_PRODUCTS_REQUEST });
  return request({
    url: "/dev-api/user/products",
    method: "post",
    data,
  });
};

export const saveProduct = (data: IProductOriginal) =>
  request({
    url: "/dev-api/user/product/save",
    method: "post",
    data,
  });
export const getProductInfo = (data: IParams) =>
  request({
    url: "/dev-api/user/product",
    method: "post",
    data,
  });

export const getDevelopmentBoards = (data: IPageation) => {
  Object.assign(data, {
    messageType: GET_DEVELOPMENT_BOARDS_REQUEST,
    needAccessoryInterface: true,
  });
  return request({
    url: "/dev-api/development_boards",
    method: "post",
    data,
  });
};
export const getDevelopmentBoard = (data: IBoardParams) => {
  Object.assign(data, {
    messageType: GET_DEVELOPMENT_BOARD_REQUEST,
  });
  return request({
    url: "/dev-api/development_board",
    method: "post",
    data,
  });
};

export const getAccessories = (data: IAccessories) => {
  Object.assign(data, {
    messageType: GET_ACCESSORIES_REQUEST,
    needAccessoryDetail:true
  });
  return request({
    url: "/dev-api/accessories",
    method: "post",
    data,
  });
};
