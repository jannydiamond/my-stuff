import { setAuthToken } from 'client/utils/localStorage'
import { MyStuffUser } from 'model/types'
import { mystuffApi } from '.'

export type Token = string

export const authenticationApi = mystuffApi.injectEndpoints({
  endpoints: (builder) => ({
    postRegistration: builder.mutation<
      MyStuffUser,
      {
        username: string
        password: string
      }
    >({
      query: (registerData) => ({
        url: `register`,
        method: 'POST',
        body: registerData,
      }),
    }),
    postLogin: builder.mutation<
      Token,
      {
        username: string
        password: string
      }
    >({
      query: (loginData) => ({
        url: `login`,
        method: 'POST',
        body: loginData,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        const { data } = await queryFulfilled

        setAuthToken(data)
      },
    }),
  }),
  overrideExisting: false,
})

export const { usePostRegistrationMutation, usePostLoginMutation } =
  authenticationApi
