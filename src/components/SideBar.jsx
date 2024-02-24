"use client"
import Image from "next/image";
import Link from "next/link";
import folder from '@/images/folder.svg'
import file from '@/images/file.svg'
import document from '@/images/document2.svg'
import {useState} from "react";

const SideBar=({data})=>{
    const filesData=Object.values(data)
    console.log("mani-error",data)
    for (const eachFile of filesData) {
        console.log("mani-error2",eachFile)
        let pushItem={name:"",key:"",is_dir:false,show_item:true}
        pushItem["is_dir"]=eachFile.name.includes('.')
        pushItem["name"]=eachFile.name
        pushItem["show_item"]=eachFile.name!=='index.md'
        // filesData.push(pushItem)
        // if (eachFile)
    }

    const EachFile=({item})=>{
        let linkpath="/notes/"+item.path.split('.')[0]
        return (
            <Link href={linkpath}>
                <div className={'flex items-center'}>
                    <Image src={document} alt={'file'} style={{width:25,objectFit:"contain"}}/>
                    <h2 className={'mt-2 ml-2 text-violet-500'} key={item.name}>{item.name}</h2>
                </div>
            </Link>
        )
    }
    const EachDirectory = ({item, contents}) => {
        const [open,setOpen]=useState(false)
        if (item.isFile) return ;
        return (
            <>
                <div className={'flex items-center'}>
                    <Image src={folder} alt={'folder'} style={{width:30,objectFit:"contain"}}/>
                    <h2 className={'mt-2 ml-2 text-orange-500'}>{item.name}</h2>
                </div>

                {
                    contents.length && contents.map(each_child => (
                        <div className={'ml-4'} key={each_child.name}>
                            {
                                each_child.isFile ? (
                                    <EachFile item={each_child} key={each_child.name}/>
                                ) : <EachDirectory item={each_child} contents={each_child.children || []}/>
                            }
                        </div>
                    ))
                }
            </>
        )
    }
    return (
        <>
            {
                Object.values(data).map(item=>
                    <>
                        {
                            item.isFile && item.name!=="index.md"?(
                                <EachFile item={item} key={item.name}/>
                            ):<EachDirectory item={item} name={item.name} contents={item.children || []}/>
                        }

                    </>
                )
            }

        </>
    )
}

export default SideBar;