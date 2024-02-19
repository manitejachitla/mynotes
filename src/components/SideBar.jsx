import fs from 'fs'
import path from 'path'
import Link from "next/link";

const SideBar=async ({data,basepath})=>{
    const filesData=Object.values(data)
    for (const eachFile of data) {
        let pushItem={name:"",key:"",is_dir:false,show_item:true}
        pushItem["is_dir"]=eachFile.includes('.')
        pushItem["name"]=eachFile
        pushItem["show_item"]=eachFile!=='index.md'
        filesData.push(pushItem)
        // if (eachFile)
    }

    const EachFile=({item})=>{
        let linkpath="/notes/"+path.relative(basepath,item.path).split('.')[0]
        return (
            <Link href={linkpath}>
                <h2 className={'mt-2 text-violet-500'} key={item.name}>{item.name}</h2>
            </Link>
        )
    }
    const EachDirectory = ({item, contents}) => {
        if (item.isFile) return ;
        return (
            <>
                <h2 className={'mt-2 ml-2 text-orange-500'} >{item.name}</h2>
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