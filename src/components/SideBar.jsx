"use client"
import Image from "next/image";
import Link from "next/link";
import folder from '@/images/folder.svg'
import file from '@/images/file.svg'
import arrow from '@/images/arrow.png'
import addFolderImg from '@/images/add-folder.png'
import addFileImg from '@/images/add-file.png'
import document from '@/images/document2.svg'
import {useState} from "react";
import {Fragment} from "react";
import {useRouter} from "next/router";
import Axios from "@/utils/Axios";
const SideBar=({data})=>{
    const [action,setAction]=useState(null)
    const [active,setActive]=useState(null)
    const [fileName,setFileName]=useState('')
    const filesData=Object.values(data)
    for (const eachFile of filesData) {
        let pushItem={name:"",key:"",is_dir:false,show_item:true}
        pushItem["is_dir"]=eachFile.name.includes('.')
        pushItem["name"]=eachFile.name
        pushItem["show_item"]=eachFile.name!=='index.md'
        // filesData.push(pushItem)
        // if (eachFile)
    }

    const onAddAction=async (type)=>{
        setAction(type)
        if (!active){
            
        }
    }
    const addFile=async ()=>{
        let postData={
            "content": "",
            "name": fileName,
            "children": [],
            "parent":active || undefined,
            "isFile": action==='file'
        }
        let data=await Axios.post('markdown/add',postData)
        console.log(data)
    }
    return (
        <>

            <div className={'flexa itemas-center'}>
                My Notes
                <Image src={addFileImg} onClick={()=>onAddAction('file')} alt={'add file'} className={'float-right mr-4'} height={20} width={20}/>
                <Image src={addFolderImg} alt={'add folder'} onClick={()=>onAddAction('folder')} className={'float-right mr-4'} height={20} width={20}/>
            </div>
            {
                action?(
                    <div>
                        <input type="text"
                               className={'bg-slate-400 text-white'}
                               value={fileName}
                               onChange={e=>setFileName(e.target.value)}
                               onKeyUp={e=>{
                                   if (e.key==="Enter"){
                                       addFile()
                                   }}}
                        />
                    </div>
                ):""
            }
            {
                Object.values(data).map(item=>
                    <Fragment key={item._id}>
                        {
                            item.isFile && item.name!=="index.md"?(
                                <EachFile item={item} key={item._id}/>
                            ):<EachDirectory active={item._id===active} setActive={setActive} item={item} name={item.name} contents={item.children || []}/>
                        }

                    </Fragment>
                )
            }

        </>
    )
}
const EachFile=({item,onClick})=>{
    let linkpath="/notes/"+item._id
    return (
        <Link href={linkpath}>
            <div className={'flex items-center cursor-pointer'} onClick={()=>{
                if (onClick) {
                    onClick()
                }
            }}>
                <Image src={document} alt={'file'} style={{width:25,objectFit:"contain"}}/>
                <h2 className={'mt-2 ml-2 text-violet-500'} key={item.name}>{item.name}</h2>
            </div>
        </Link>
    )
}
const EachDirectory = ({item, contents,setActive,active}) => {
    console.log(contents)
    const [open,setOpen]=useState(false)
    if (item.isFile) return ;
    return (
        <>
            <div className={`flex items-center cursor-pointer ${active?'bg-slate-300':''}`} onClick={() => {
                setOpen(!open)
                setActive(item._id)
            }}>
                <Image className={`ml-2 mr-2 font-16 transition-transform ${open?"rotate-90":""}`} style={{width:15,objectFit:"contain"}} src={arrow} alt={"Expand"}></Image>
                <Image src={folder} alt={'folder'} style={{width: 30, objectFit: "contain"}}/>
                <h2 className={'mt-2 ml-2 text-orange-500'}>{item.name}</h2>
            </div>

            {
                open && contents.length>0 && contents.map(each_child => (
                    <div className={'ml-4'} key={each_child.name}>
                        {
                            each_child.isFile ? (
                                <EachFile item={each_child} key={each_child.name} onClick={()=>setActive(item._id)}/>
                            ) : <EachDirectory item={each_child} active={item._id===active} setActive={setActive} contents={each_child.children || []}/>
                        }
                    </div>
                ))
            }
        </>
    )
}
export default SideBar;