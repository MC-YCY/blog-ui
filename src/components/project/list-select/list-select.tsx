'use client'

import React, { useState, useEffect } from 'react'
import style from './style.module.css'

type Option = {
  label?: string;
  name?: string;
  value?: string;
  path?: string;
};

type ListSelectProps = {
  /** 要渲染的选项列表 */
  list: Option[];
  /** 组件 name，用于 radio group（默认为 'list-select'） */
  name?: string;
  /** 外部控制的初始值 */
  defaultValue?: string;
  /** 值变化时触发，参数为选中的 value */
  onChange?: (value: string) => void;
};

export const ListSelect: React.FC<ListSelectProps> = ({
                                                        list,
                                                        name = 'list-select',
                                                        defaultValue,
                                                        onChange,
                                                      }) => {
  // 默认选中第一个或者 defaultValue
  const [selected, setSelected] = useState<string>(
    defaultValue ?? list[0]?.value ?? '',
  )

  // 如果 parent 传来了 defaultValue，并且 defaultValue 变化了，就同步
  useEffect(() => {
    if (defaultValue !== undefined) {
      setSelected(defaultValue)
    }
  }, [defaultValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value)
    onChange?.(e.target.value)
  }

  return (
    <div className={style.radioInputs}>
      {list.map((item) => (
        <label key={item?.value || item?.path}>
          <input
            type="radio"
            name={name}
            value={item?.value || item?.path}
            className={style.radioInput}
            checked={selected === (item?.value || item?.path)}
            onChange={handleChange}
          />
          <span className={style.radioTile}>
            <span className={style.radioIcon}>{/* 可放图标 */}</span>
            <span className={style.radioLabel}>{item?.label || item?.name}</span>
          </span>
        </label>
      ))}
    </div>
  )
}
