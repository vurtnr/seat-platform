import request from '@/utils/request'
export const getParams = (params: any) =>
  request({
    url: '/params',
    method: 'get',
    params
  })