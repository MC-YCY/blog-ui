// stores/userStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// 类型定义
type User = {
  id: string
  username: string
  email: string
  avatarUrl?: string
  phone?: string
  createdAt: string
}

type AuthTokens = {
  accessToken: string
  refreshToken: string
}

type UserState = {
  user: User | null
  tokens: AuthTokens | null
  isLoggedIn: boolean
  login: (user: User, tokens: AuthTokens) => void
  logout: () => void
  updateUser: (partialUser: Partial<User>) => void
  updateTokens: (tokens: AuthTokens) => void
}

// 初始状态
const initialState = {
  user: null,
  tokens: null,
  isLoggedIn: false
}

const useUserStore = create<UserState>()(
  persist(
    (set, _get) => ({
      ...initialState,

      login: (user, tokens) => set({
        user,
        tokens,
        isLoggedIn: true
      }),

      logout: () => {
        // 清除前获取当前状态
        // const currentState = get()

        // 可在此处添加注销 API 调用
        // await authApi.logout(currentState.tokens?.refreshToken)

        set(initialState)
      },

      updateUser: (partialUser) => set((state) => ({
        user: state.user ? { ...state.user, ...partialUser } : null
      })),

      updateTokens: (tokens) => set({ tokens })
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isLoggedIn = !!state.user && !!state.tokens
        }
      }
    }
  )
)

export default useUserStore