export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: {
    city: string
    street: string
    suite: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  company: {
    bs: string
    name: string
    catchPhrase: string
  }
}
