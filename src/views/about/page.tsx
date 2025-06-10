'use client';
import {Container} from "@/components/project/container";
import {Diary} from "@/components/project/diary/diary";
import {IconSunFilled} from "@tabler/icons-react";
import {cn} from "@/lib/utils";

const texts:string[] = [
  `菩提：我教你 HTML、CSS、JavaScript，精通流行框架搭建之术，以后做个优秀前端工程师可好？`,
  `悟空：前端加班多、兼容苦，不学不学！`,
  `菩提：那我教你 Java、C#、数据库底层协议，掌握高并发架构设计，做个后端大拿如何？`,
  `悟空：后端卷成红海，996 福报难逃，不学不学！`,
  `菩提：再教你 Python、C++、神经网络训练，搞出 ChatGPT 级 AI 模型，实现财富自由？`,
  `悟空：调参烧显卡，论文发不出，不如去夜市炒粉，不学不学！`,
  `菩提（怒砸键盘）：你这猢狲，这也不学那也不学！（拂袖而去）`,
  '深夜，悟空潜入机房。',
  `菩提（压低声音）：我教你黑客技术、木马投放、病毒设计，附赠各大银行安全漏洞，保你黑进美联储金库，日进斗金！`,
  `悟空（两眼放光）：师父快教我！学成之后如何报答？`,
  '菩提：说什么报答之恩，日后东窗事发，莫要供出为师即可！'
]
const AboutPage = () => {
    return <div className={'pt-[64px]'}>
        <Container>
            <div className={'pl-[8px]'}>
                <Diary title={'<求学记>'} date={'2025/5/20'}
                       weather={<IconSunFilled width={24} height={24} color={'#ecca2f'}/>} content={
                    <>
                        {texts.map((text, index) => {
                            return <p className={cn('indent-[2em] cursor-pointer')}
                                      key={index + 'about-text'}>{text}</p>;
                        })}
                    </>
                }></Diary>
            </div>
        </Container>
    </div>
}

export default AboutPage;