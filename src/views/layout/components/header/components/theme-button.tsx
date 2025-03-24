import { Button } from '@/components/ui/button.tsx'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
// 假设 Tooltip 相关组件已经在相应目录下导出
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, TooltipContentItem } from '@/components/ui/tooltip'
import useThemeStore, { Theme } from '@/stores/themeStore.ts'

const seasonalThemes: { name: string, value: Theme }[] = [
  { name: '春', value: 'spring' },
  { name: '夏', value: 'summer' },
  { name: '秋', value: 'autumn' },
  { name: '冬', value: 'winter' },
]

const ThemeButton = () => {
  // 假设 themeStore 提供了 theme, toggleTheme 和 setTheme 方法
  const { theme, toggleTheme, setTheme } = useThemeStore()

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        {/* 使用 asChild 将 Button 作为 Tooltip 的触发器 */}
        <TooltipTrigger asChild>
          <Button variant="ghost" onClick={toggleTheme}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {
            seasonalThemes.map(item => (
              <TooltipContentItem
                key={item.value}
                onClick={() => setTheme(item.value)}
              >
                {item.name} 主题
              </TooltipContentItem>
            ))
          }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ThemeButton
