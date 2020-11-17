import type { Either } from 'fp-ts/lib/Either'
import type * as t from 'io-ts'
import { fold } from 'fp-ts/lib/Either'
import { TaskEither, tryCatch, map } from 'fp-ts/lib/TaskEither'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { absurd, constVoid, pipe, unsafeCoerce } from 'fp-ts/lib/function'

export async function _post<Y>(path: string, values: Y, method: string = 'POST') {
  const value: Either<Error, Response> = values instanceof Promise ? await values : values
  const ok = await pipe(
    tryCatch(
      () =>
        fetch(path, {
          method,
          body: JSON.stringify(value),
          headers: {
            'Content-Type': 'application/json'
          }
        }),
      (reason) => new Error(`${reason}`)
    ),
    map(async (response) => {
      if (!response.ok) new Error(`${response}`)
      return await response.json()
    })
  )()

  return ok
}

export async function _get<Y>(path: string, values: Y, method: string = 'GET') {
  var url = new URL(path)
  Object.keys(values).forEach((key) => url.searchParams.append(key, values[key]))

  const ok = await pipe(
    tryCatch(
      () =>
        fetch(url.toString(), {
          method,
          headers: {
            'Content-Type': 'application/json'
          }
        }),
      () => constVoid() as never
    ),
    map((response) => unsafeCoerce<unknown, Response>(response))
  )()

  return ok
}
