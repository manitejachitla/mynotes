"use client"
import { MDXRemote } from 'next-mdx-remote/rsc'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {ForwardRefEditor} from "@/components/ForwardRefEditor";
export default function MarkDown({data,readOnly,isNewNote}){
    let editorData=data
    if (isNewNote){
        if (typeof window !== 'undefined') {
            editorData=localStorage.getItem('my-data') || ''
        }
    }


    return(
        <article className="prose prose-zinc">
            <ForwardRefEditor
                readOnly={readOnly}
                markdown={editorData}
                onChange={(data)=>{
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('my-data',data)
                    }

                }}
            />
        </article>

    )
}
