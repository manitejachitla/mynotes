import fs from "fs";
import path from "path";

import MarkDown from "@/components/MarkDown";
const basePath=path.resolve("src/docs")
import './styles.css'
import Axios from "@/utils/Axios";
const CurrentNote=async ({params})=>{
   const {note}=params;
    const noteId=note[0] || ''
    const isNewNote=noteId.includes('new')
    let fileData;
    if (isNewNote){
        fileData=''
    } else {
        const response=await fetch('http://127.0.0.1:3001/markdown/'+noteId,{ next: { revalidate: 10 } })
        let getNote=await response.json()
        fileData=getNote?.content || ''
    }
    return (
        <>
            <div className="file_content">
                {
                    typeof fileData=="string"?(
                        <>
                            <h2 className={'text-xl '}>Your content</h2>
                            <MarkDown data={fileData} id={noteId} readOnly={false} isNewNote={isNewNote}/>
                        </>
                    ): (
                        <h2 className={'bold text-orange-500 text-center'}>The File You have Requested is not found</h2>
                    )
                }
            </div>
        </>
)
}
export default CurrentNote