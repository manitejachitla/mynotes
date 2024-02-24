"use client"
import { MDXRemote } from 'next-mdx-remote/rsc'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {ForwardRefEditor} from "@/components/ForwardRefEditor";
export default function MarkDown({data}){
    return(
        <article className="prose prose-zinc">
            <ForwardRefEditor
                readOnly={true}
                markdown={data}
                onChange={(data)=>{
                    console.log(data)
                }}
            />
        </article>

    )
}
