import request from '@/utils/request'

export function login(data) {
  return request({
      url: `/api/sessions`,
      method: 'post',
      data
  })
}