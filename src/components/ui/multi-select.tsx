import { useState, useEffect, useRef } from 'react'
import { useController } from 'react-hook-form'

const MultiSelect = ({
                       options,
                       placeholder = '请选择...',
                       className = '',
                       control,
                       name,
                     }: any) => {
  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: [],
  })

  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const selectedValues = value as string[]

  // 点击外部关闭下拉
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 切换选项选中状态
  const toggleOption = (value: string) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value]

    onChange(newSelected)
  }

  // 清除所有选中
  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange([])
  }

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      {/* 触发按钮 */}
      <div
        className="flex items-center justify-between p-2 border rounded-md cursor-pointer"
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1">
          {selectedValues.length > 0 ? (
            options
              .filter((opt: any) => selectedValues.includes(opt.value))
              .map((opt: any) => (
                <span
                  key={opt.value}
                  className="px-2 py-1 text-sm rounded-md flex items-center gap-1"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                >
                  {opt.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleOption(opt.value)
                    }}
                    className="hover:opacity-70 transition-opacity"
                  >
                    ×
                  </button>
                </span>
              ))
          ) : (
            <span className="opacity-70">{placeholder}</span>
          )}
        </div>

        <div className="flex items-center gap-2 ml-2">
          {selectedValues.length > 0 && (
            <button
              type="button"
              onClick={clearSelection}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          )}
          <svg
            className={`w-4 h-4 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            style={{
              stroke: 'var(--foreground)',
            }}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* 下拉选项 */}
      {isOpen && (
        <div
          className="absolute z-10 w-full px-2 mt-1 rounded-md shadow-lg overflow-y-auto"
          style={{
            backgroundColor: 'var(--popover)',
            border: '1px solid var(--border)',
            color: 'var(--popover-foreground)',
          }}
        >
          {options.map((option: any) => (
            <div
              key={option.value}
              onClick={() => toggleOption(option.value)}
              className={`flex items-center justify-between p-1 cursor-pointer transition-colors mb-1 rounded-sm ${
                selectedValues.includes(option.value)
                  ? 'opacity-90 text-background'
                  : 'hover:bg-[var(--accent)]'
              }`}
              style={{
                backgroundColor: selectedValues.includes(option.value)
                  ? 'var(--primary)'
                  : 'transparent',
              }}
            >
              <span>{option.label}</span>
              {selectedValues.includes(option.value) && (
                <svg
                  className="w-4 h-4"
                  style={{
                    stroke: 'var(--primary-foreground)',
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MultiSelect