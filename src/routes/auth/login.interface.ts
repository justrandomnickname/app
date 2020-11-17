import * as t from 'io-ts'

export interface ILoginForm {
  name: string
}

export interface ILoginResponse {
  success: boolean
}

export const TokenResponse = t.type({
  token: t.string
})

export type TokenResponse = t.TypeOf<typeof TokenResponse>

export const User = t.type({
  userId: t.number
})

export type User = t.TypeOf<typeof User>
