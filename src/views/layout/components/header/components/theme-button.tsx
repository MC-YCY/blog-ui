import { Button } from '@/components/ui/button.tsx'
import { SunIcon, MoonIcon } from "@radix-ui/react-icons"
import useThemeStore from '@/stores/themeStore.ts'

const ThemeButton = () =>{
  const { theme, toggleTheme } = useThemeStore()

  return <>
    <Button variant="ghost" onClick={toggleTheme}>
      {
        theme === 'dark' ? <SunIcon></SunIcon> : <MoonIcon></MoonIcon>
      }
    </Button>
  </>
}
export default ThemeButton;