// stores/userStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { logoutApi } from '@/api/auth.api.ts'

// 类型定义
export type User = {
  id: string
  username: string
  email: string
  avatar?: string
  phone?: string
  createdAt: string
}

type AuthTokens = {
  accessToken: string
  refreshToken: string
}

type btnList = {
  label: string
  value: string
}[]

type UserState = {
  user: User | null
  btnList: btnList
  tokens: AuthTokens | null
  isLoggedIn: boolean
  login: (user: User, tokens: AuthTokens) => void
  logout: () => void
  updateUser: (partialUser: Partial<User>) => void
  updateTokens: (tokens: AuthTokens) => void
  setBtnList: (btnList: btnList) => void
}

// 初始状态
const initialState = {
  user: null,
  tokens: null,
  isLoggedIn: false,
  btnList: []
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      ...initialState,

      login: (user, tokens) => set({
        user,
        tokens,
        isLoggedIn: true
      }),

      logout: async () => {
        const currentState = get();
        if (currentState.user?.id) {
          try {
            await logoutApi({ userId: currentState.user.id })
          } catch (error) {
            console.error('注销失败:', error)
          }
        }
        set(initialState)
      },

      updateUser: (partialUser) => set((state) => ({
        user: state.user ? { ...state.user, ...partialUser } : null
      })),

      updateTokens: (tokens) => set({ tokens }),

      setBtnList: (list: btnList) => set({ btnList:list })
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