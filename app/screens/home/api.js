import Faker from 'Faker'
import { random, min, times } from 'lodash'

const totalCount = 22
const perPage = 10

export default {
  getPosts(page) {
    return new Promise(resolve => {
      setTimeout(() => {
        const pageCount = min([totalCount - (page - 1) * perPage, perPage])
        const pagination = { page, perPage, pageCount, totalCount }
        const records = times(
          10,
          () => ({
            title: Faker.Lorem.sentence(),
            description: Faker.Lorem.paragraph(),
          })
        )

        resolve({ pagination, records })
      }, random(1000, 3000))
    })
  },
}
