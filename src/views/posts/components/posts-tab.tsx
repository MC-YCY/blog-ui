"use client";

import { Tabs, type Tab } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useState, useMemo, ReactNode } from "react";
import TimelineTab from "./posts-timeline.tab.tsx";
import RecommendTab from "./posts-recommend.tab.tsx";

// 定义 Tab 类型
interface TabItem extends Tab {
  value: "timeline" | "recommend" | string; // 限制 value 只能是这两个值
}

// 组件
export default function PostsTabs() {
  // Tab 配置
  const tabs: TabItem[] = [
    { title: "时轴", value: "timeline" },
    { title: "推荐", value: "recommend" }
  ];

  // 默认激活 Tab
  const defaultActiveTab = tabs[0];

  // 记录访问过的 Tabs，初始化时包含默认 tab
  const [visitedTabs, setVisitedTabs] = useState<Set<TabItem["value"]>>(new Set([defaultActiveTab.value]));
  const [activeTab, setActiveTab] = useState<TabItem>(defaultActiveTab);
  const [webType] = useState<string>();

  // 缓存 tab 内容
  const tabContentMap: Record<TabItem["value"], ReactNode> = useMemo(
    () => ({
      timeline: <TimelineTab />,
      recommend: <RecommendTab />
    }),
    []
  );

  // 处理 Tab 切换
  const handleTabChange = (tab: Tab) => {
    setVisitedTabs((prev) => new Set(prev).add(tab.value)); // 记录访问过的 tab
    setActiveTab(tab);
  };

  // 右侧筛选框
  const renderRight = () => (
    <Select value={webType} defaultValue={'All'} >
      <SelectTrigger className="w-[180px] bg-white dark:bg-black">
        <SelectValue placeholder="技术类型"/>
      </SelectTrigger>
      <SelectContent className="z-[1000000]">
        <SelectGroup>
          <SelectLabel>options</SelectLabel>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Vue">Vue</SelectItem>
          <SelectItem value="React">React</SelectItem>
          <SelectItem value="Angular">Angular</SelectItem>
          <SelectItem value="NestJs">NestJs</SelectItem>
          <SelectItem value="Outer">Outer</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );

  return (
    <div>
      <Tabs
        active={activeTab}
        onActiveChange={handleTabChange}
        tabs={tabs}
        hoverOffset={10}
        childrenRightSLot={renderRight()}
        containerClassName={'z-[50] sticky top-[70px]'}
      />

      {/* 保持已访问过的组件不被卸载 */}
      {tabs.map((tab) => (
        <div key={tab.value} className={activeTab.value === tab.value ? "block" : "hidden"}>
          {visitedTabs.has(tab.value) ? tabContentMap[tab.value] : null}
        </div>
      ))}
    </div>
  );
}
