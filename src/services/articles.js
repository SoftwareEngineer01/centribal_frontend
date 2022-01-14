import { http } from './http_service'

export function getArticles() {
  return http().get('/article')
}

