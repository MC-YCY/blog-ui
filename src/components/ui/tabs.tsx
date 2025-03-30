"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any | React.ReactElement;
};

export const Tabs = ({
                       tabs: propTabs,
                       containerClassName,
                       activeTabClassName,
                       tabClassName,
                       contentClassName,
                       childrenRightSLot,
                       hoverOffset = 50,
                       active, // 新增外部传入的active prop
                       onActiveChange // 新增active变化回调
                     }: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  hoverOffset?: number;
  childrenRightSLot?: React.ReactNode | any;
  active: Tab; // 新增类型定义
  onActiveChange?: (tab: Tab) => void; // 新增类型定义
}) => {
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  // 根据active变化重新排序tabs
  useEffect(() => {
    const newTabs = [...propTabs];
    const activeIndex = newTabs.findIndex(t => t.value === active.value);
    if (activeIndex !== -1) {
      const [selectedTab] = newTabs.splice(activeIndex, 1);
      newTabs.unshift(selectedTab);
      setTabs(newTabs);
    }
  }, [active, propTabs]);

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {propTabs.map((tab) => (
          <button
            key={tab.title}
            onClick={() => onActiveChange?.(tab)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-4 py-2 rounded-full bg-background", tabClassName)}
            style={{ transformStyle: "preserve-3d" }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-secondary rounded-full",
                  activeTabClassName
                )}
              />
            )}

            <span className="relative block text-black dark:text-white">
              {tab.title}
            </span>
          </button>
        ))}
        <div className={"ml-auto"}>
          {childrenRightSLot}
        </div>
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        hoverOffset={hoverOffset}
        className={cn("mt-32", contentClassName)}
      />
    </>
  );
};

// FadeInDiv组件保持不变
const FadeInDiv = ({
                     className,
                     tabs,
                     hovering,
                     hoverOffset = 50,
                     active:_
                   }: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
  hoverOffset?: number;
}) => {
  const isActive = (tab: Tab) => tab.value === tabs[0].value;

  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -hoverOffset : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0
          }}
          animate={{
            y: isActive(tab) ? [0, hoverOffset, 0] : 0
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};