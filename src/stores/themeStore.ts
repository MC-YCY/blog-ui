// themeStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'spring' | 'summer' | 'autumn' | 'winter'

const getSystemTheme = (): Theme => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: getSystemTheme(), // 默认使用系统主题
      toggleTheme: () => {
        // 如果当前为 light 或 dark，则切换，否则恢复为系统主题
        const currentTheme = get().theme
        if (currentTheme === 'light') {
          set({ theme: 'dark' })
        } else if (currentTheme === 'dark') {
          set({ theme: 'light' })
        } else {
          set({ theme: getSystemTheme() })
        }
      },
      setTheme: (theme: Theme) => set({ theme })
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // 处理 SSR 场景
        if (state && typeof window !== 'undefined') {
          const html = document.documentElement
          html.className = `trancy-zh-CN ${state.theme}`
          html.style.colorScheme = state.theme
        }
      }
    }
  )
)

export default useThemeStore
