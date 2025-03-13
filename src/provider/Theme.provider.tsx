// Theme.provider.tsx
import { useEffect } from 'react'
import useThemeStore from '@/stores/themeStore.ts'

const ThemeProvider = () => {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    const html = document.documentElement

    // 清理旧主题类
    html.classList.remove('light', 'dark')

    // 添加新主题类
    html.classList.add('trancy-zh-CN', theme)

    // 设置 color-scheme
    html.style.colorScheme = theme

    // 同步到 body 作为备用选择器
    document.body.className = `theme-${theme}`

  }, [theme])

  return null
}

export default ThemeProvider