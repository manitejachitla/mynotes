import { MDXRemote } from 'next-mdx-remote/rsc'
import SyntaxHighlighter from 'react-syntax-highlighter'
function code({className, ...properties}) {
    const match = /language-(\w+)/.exec(className || '')
    return match
        ? <SyntaxHighlighter language={match[1]} PreTag="div" {...properties} />
        : <code className={className} {...properties} />
}
const MarkDown=async ({data})=>{
    return(
        <MDXRemote
            source={data}
        />
    )
}

export default MarkDown