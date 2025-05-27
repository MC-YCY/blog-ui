'use client';

import {HomeData} from "@/components/pages/home/home-data";
import {HomeCode} from "@/components/pages/home/home-code";
import {HomeHero} from "@/components/pages/home/home-hero";
import {HomeDiary} from "@/components/pages/home/home-diary";
import {HomeArticle} from "@/components/pages/home/home-article";
import {HomePicture} from "@/components/pages/home/home-picture";
import {HomeMessageBoard} from "@/components/pages/home/home-message-board";

export default function Home() {
    return <div>
        <HomeHero></HomeHero>
        <HomeData></HomeData>
        <HomeDiary></HomeDiary>
        <HomeCode></HomeCode>
        <HomeArticle></HomeArticle>
        <HomePicture></HomePicture>
        <HomeMessageBoard></HomeMessageBoard>
    </div>
}
