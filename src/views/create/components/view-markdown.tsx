import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const ViewMarkdown = () => {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} >
    *React-Markdown* now supports ~strikethrough~. Thanks to gfm plugin.
  </ReactMarkdown>
}
