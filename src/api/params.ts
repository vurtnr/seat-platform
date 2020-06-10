import request from '@/utils/request'
export const getParams = (params: any) =>
  request({
    url: '/mock/params',
    method: 'get',
    params
  })
