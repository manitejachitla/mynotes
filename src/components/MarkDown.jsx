"use client"
import { MDXRemote } from 'next-mdx-remote/rsc'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {ForwardRefEditor} from "@/components/ForwardRefEditor";
import React, {useEffect, useState} from "react";
import Axios from "@/utils/Axios";
import {io} from "socket.io-client";
export default function MarkDown({id,data,readOnly,isNewNote}){
    const [content,setContent]=useState(data)
    const [socket,setSocket]=useState(data)
    let timerRef=React.createRef();
    let editorRef=React.createRef();
    let editorData=data
    if (isNewNote){
        if (typeof window !== 'undefined') {
            // editorData=localStorage.getItem('my-data') || ''
        }
    }
    useEffect(()=>{
        const s = io("http://127.0.0.1:3001");
        setSocket(s)
        return ()=>{
            if (socket.connected){
                socket.disconnect()
            }
        }
    },[])
    useEffect(()=>{
        if (editorRef && socket && socket?.on){
            socket.on('document-updated',(payload)=>{
                console.log(editorRef)
                editorRef.setMarkdown(payload.data)
                // setContent(payload.data)
            })
        }
    },[editorRef,socket])

    useEffect(()=>{
        //document
        if (socket.connected){
            socket.emit('document',{id})
        }
    },[socket.connected])
    useEffect(() => {
        const timer=setTimeout(()=>{
            updateDocument()
        },1000)

        return ()=>clearTimeout(timer)
    }, [content]);

    const updateDocument=async ()=>{
        const reqBody={
            content
        }
        if (socket.connected){
            socket.emit('change',{id,data:content})
        }
        // const updateDoc=await Axios.put('markdown/'+id,reqBody)
    }

    return(
        <article className="prose prose-zinc">
            <ForwardRefEditor
                readOnly={readOnly}
                markdown={content}
                ref={(ref)=>editorRef=ref}
                onChange={(data)=>{
                    setContent(data)
                }}
            />
        </article>

    )
}
