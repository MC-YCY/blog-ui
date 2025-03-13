import ThemeProvider from '@/provider/Theme.provider.tsx'
import useThemeStore from '@/stores/themeStore.ts'
import PlayRouter from '@/components/router.tsx'
import { Toaster } from 'sonner'


function App() {
  // 初始主题store缓存
  useThemeStore.persist.rehydrate()

  return (<>
    <ThemeProvider></ThemeProvider>
    <PlayRouter></PlayRouter>
    <Toaster></Toaster>
  </>)
}
export default App