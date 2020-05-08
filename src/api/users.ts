import request from '@/utils/request'
import { IUserData } from '@/api/types'

export const defaultUserData: IUserData = {
  id: 0,
  username: '',
  password: '123456',
  checkPassword: '',
  name: '',
  avatar: '',
  introduction: '',
  email: '',
  phone: '',
  roles: ['visitor'],
  status: null
}

export const login = (data: any) =>
  request({
    url: '/users/login',
    method: 'post',
    data
  })

export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params
  })

export const getMerchants = (params: any) =>
  request({
    url: '/merchants',
    method: 'get',
    params
  })

export const getUserInfo = (data: any) =>
  request({
    url: '/users/info',
    method: 'post',
    data
  })

export const getUserByName = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'get'
  })

export const updateUser = (username: string, data: any) =>
  request({
    url: `/users/${username}`,
    method: 'put',
    data
  })

export const deleteUser = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'delete'
  })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: '/users/register',
    method: 'post',
    data
  })
