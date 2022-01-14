import { http } from './http_service'

export function getOrders() {
  return http().get('/order')
}

export function addOrder(data) {
  return http().post('/order', data)
}

