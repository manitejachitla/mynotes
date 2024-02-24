"use client"
import React from "react";
import Markdown from 'markdown-to-jsx'
function SyntaxHighlightedCode(props) {
    const ref = React.useRef(null)

    React.useEffect(() => {
        if (ref.current && props.className?.includes('lang-') && window.hljs) {
            window.hljs.highlightElement(ref.current)

            // hljs won't reprocess the element unless this attribute is removed
            ref.current.removeAttribute('data-highlighted')
        }
    }, [props.className, props.children])

    return <code {...props} ref={ref} />
}
export default async function MarkDown({data}){
    return (
        <article className="prose lg:prose-xl">
            <Markdown
                children={data}
                      options={{
                          overrides: {
                              code: SyntaxHighlightedCode,
                          },
                      }}>
            </Markdown>
        </article>


    )
}
