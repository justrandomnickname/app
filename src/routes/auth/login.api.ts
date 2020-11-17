import { pipe, flow } from 'fp-ts/lib/function'
import { task, Task } from 'fp-ts/lib/Task'
import type { ILoginForm, ILoginResponse } from './login.interface'
import type { TokenResponse, User } from './login.interface'
import { _post, _get } from '../../utils/fetch'
import type { Either, Left, Right } from 'fp-ts/lib/Either'
import type * as t from 'io-ts'
import { TaskEither, chain, fromEither, tryCatch, map, right, fold as asyncFold } from 'fp-ts/lib/TaskEither'

export const loginWith = async (values: ILoginForm) => {
  const loginPipeline = pipe(values, async (values) => await _post<ILoginForm>('/auth/login', values))

  const ok = await pipe(
    tryCatch(
      async () => loginPipeline,
      (reason) => new Error(`${reason}`)
    ),
    map(async (res) => {
      console.log('AUTH RESP', res)
      if (res._tag === 'Right') {
        return res.right
      }
    })
  )()

  if (ok._tag === 'Left') console.error(new Error(`${ok.left.message}`))

  return ok
}

export const fetchUser = async (values: { token: string }) => {
  const userPipeline = pipe(
    values,
    async (values) => await _get<TokenResponse>('http://localhost:8080/auth/user', values)
  )
  const ok = await pipe(
    tryCatch(
      async () => userPipeline,
      (reason) => new Error(`${reason}`)
    ),
    map(async (res) => {
      console.log('USER', res)
      if (res._tag === 'Right') {
        return res.right
      }
    })
  )()

  if (ok._tag === 'Left') console.error(new Error(`${ok.left.message}`))

  return ok
}

// TODO
export const Login = async (values: ILoginForm) => {
  const task = await pipe(await loginWith(values), async (values) => {
    console.log('VALUES IS', values)
    return values
  })

  console.log('TASK IS', task)

  // if (task._tag === 'Right') {
  //   const hello = verify<TokenResponse>(TokenResponse, task.right)
  //   console.log('HMMMM', hello)
  //   const verified = TokenResponse.decode(await task.right)
  //   console.log('DATA IS', await verified)
  //   if (verified._tag === 'Right') {
  //     const data = await fetchUser(verified.right)
  //     if (data._tag === 'Right') {
  //       const verifiedUser = User.decode(await (await data.right).json())
  //       console.log('VERIFIED USER', verifiedUser)
  //       return verifiedUser
  //     }
  //   }
  // }
}
