import ThemeProvider from '@/provider/Theme.provider.tsx'
import useThemeStore from '@/sotres/themeStore.ts'
import PlayRouter from '@/components/router.tsx'

function App() {
  // 初始主题store缓存
  useThemeStore.persist.rehydrate()

  return (<>
    <ThemeProvider></ThemeProvider>
    <PlayRouter></PlayRouter>
  </>)
}
export default App