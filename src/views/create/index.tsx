import {EditorMarkdown} from './components/editor-markdown.tsx'
import Header from './components/header'

export default function(){
  return <div className={'w-screen h-screen'}>
    <Header></Header>
    <div className={'h-[calc(100vh-72px)]'}>
      <EditorMarkdown></EditorMarkdown>
    </div>
  </div>
}