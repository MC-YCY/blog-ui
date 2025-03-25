// Theme.provider.tsx
import { useEffect } from 'react'
import useThemeStore from '@/stores/themeStore.ts'

const ThemeProvider = () => {
  const theme = useThemeStore((state) => state.theme)
  const themeSuffix = useThemeStore((state) => state.themeSuffix)

  useEffect(() => {
    const html = document.documentElement

    const oldClassList = [
      'light',
      'dark',
      'theme-light',
      'theme-dark',
      'theme-light-spring',
      'theme-dark-spring',
      'theme-light-winter',
      'theme-dark-winter',
      'theme-light-summer',
      'theme-dark-summer',
      'theme-light-autumn',
      'theme-dark-autumn'
    ]
    // 清理旧主题类
    html.classList.remove(...oldClassList)

    // 添加新主题类
    html.classList.add('trancy-zh-CN', `theme-${theme}`+`${themeSuffix && themeSuffix ? '-'+themeSuffix : ''}`)

    // 设置 color-scheme
    html.style.colorScheme = `theme-${theme}`+`${themeSuffix && themeSuffix ? '-'+themeSuffix : ''}`

    // 同步到 body 作为备用选择器
    document.body.className = `theme-${theme}`+`${themeSuffix && themeSuffix ? '-'+themeSuffix : ''}`

  }, [theme,themeSuffix])

  return null
}

export default ThemeProvider