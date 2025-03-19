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

export interface ButtonsType {
  id: number
  name: string
  path: string
  component: string
  type: 'menu' | 'button'
  icon?: string
  code?: string
  explain?: string
  children: MenusType[]
  level: number
  disabled?: boolean
}

export interface MenusType {
  id: number
  name: string
  path: string
  component: string
  type: 'menu' | 'button'
  icon?: string
  code?: string
  explain?: string
  children: MenusType[]
  level: number
  disabled?: boolean
}

type UserState = {
  user: User | null
  buttons: ButtonsType[]
  menus: MenusType[]
  tokens: AuthTokens | null
  isLoggedIn: boolean
  login: (user: User, tokens: AuthTokens) => void
  logout: () => void
  updateUser: (partialUser: Partial<User>) => void
  updateTokens: (tokens: AuthTokens) => void
  setButtons: (buttons: ButtonsType[]) => void
  setMenus: (menus: MenusType[]) => void
}

// 初始状态
const initialState = {
  user: null,
  tokens: null,
  isLoggedIn: false,
  menus: [],
  buttons:[]
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

      setButtons: (buttons: ButtonsType[]) => set({ buttons }),
      setMenus: (menus: MenusType[]) => set({ menus }),
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