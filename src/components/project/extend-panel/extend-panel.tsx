import { MouseEvent, ReactNode, TransitionEvent, useState } from 'react'
import style from './style.module.css'

// 定义卡片数据类型
interface Card {
  background: string;
  title: string | ReactNode;
  description: string | ReactNode;
  count: string | ReactNode;
}

// 组件属性类型
interface ExtendPanelProps {
  cards: Card[];
}

const ExtendPanelContent = ({ card, clickItemClose }: {
  card: Card,
  clickItemClose: (event: MouseEvent<HTMLElement>) => void
}) => {
  return <div className={style.itemContent}>
    <div className={style.itemContentImageLayer}>
      <img src={card.background} alt="" />
    </div>
    <div className={style.itemContentTextLayer}>
      <div className={style.itemContentTextLayerContent}>
        <div className={style.itemContentTextLayerTitle}>{card.title}</div>
        <div className={style.itemContentTextLayerDescription}>{card.description}</div>
      </div>
    </div>
    <div className={style.itemContentNumberLayer}>
      <div className={style.itemContentNumberLayerValue}>{card.count}</div>
      <div className={style.itemContentNumberLayerClose} onClick={clickItemClose}></div>
    </div>
  </div>
}

export const ExtendPanel = (props: ExtendPanelProps) => {
  const [activeKey, setActiveKey] = useState<number>(-1)
  const clickItem = (index: number) => {
    setActiveKey(index)
  }
  const [isIngClassName, setIsIngClassName] = useState<boolean>(false)
  const clickItemClose = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setIsIngClassName(true)
    setActiveKey(-1)
  }
  const onTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement
    if (isIngClassName && element.dataset.ing === '1') {
      setIsIngClassName(false)
    }
  }
  const translate3dStyleVar = (index: number): Record<string, string | number> => {
    return {
      '--translate3d': `translate3d(${index * 105}%, 0, 0)`,
    }
  }

  return <div className={`${style.cards} ${isIngClassName ? style.ing : ''}`}>
    <div className={style.cardBox + ` ${(activeKey >= 0 ? style.start : '')}`}>
      {
        props.cards.map((card, index) => {
          let className = style.cardBoxItem
          if (index === activeKey) {
            className += ` ${style.cardBoxItemActive}`
          }
          return <div className={className} onTransitionEnd={onTransitionEnd} style={translate3dStyleVar(index)}
                      onClick={() => clickItem(index)} data-ing={1}>
            <ExtendPanelContent clickItemClose={clickItemClose} card={card}></ExtendPanelContent>
          </div>
        })
      }
    </div>
  </div>
}