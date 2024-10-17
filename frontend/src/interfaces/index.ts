export interface Group {
  id: number
  name: string
}

export interface User {
  email: string
  name?: string
  surname?: string
  permissions: string[]
  groups?: Group[]
}
