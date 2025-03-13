// themeStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Theme = 'light' | 'dark'

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
    (set) => ({
      theme: getSystemTheme(), // 默认使用系统主题
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),
      setTheme: (theme) => set({ theme })
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