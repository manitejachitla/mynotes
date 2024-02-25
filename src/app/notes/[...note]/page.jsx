import fs from "fs";
import path from "path";

import MarkDown from "@/components/MarkDown";
const basePath=path.resolve("src/docs")
import './styles.css'
const CurrentNote=async ({params})=>{
   const {note}=params;
    const isNewNote=note[0].includes('new')
    console.log(isNewNote)
    let fileData;
    if (isNewNote){
        fileData=''
    } else {
        let filePath=""
        note.forEach((path,index)=>{
            let append=index===note.length-1?'':'/'
            filePath=filePath+path+append
        })
        let finalPath=decodeURIComponent(path.resolve(basePath,filePath+".md"))
        try {
            fileData=fs.readFileSync(finalPath,'utf8')
        }catch (e) {
            console.log("file not found ")
        }
    }
    return (
        <>
            <div className="file_content">
                {
                    typeof fileData=="string"?(
                        <MarkDown data={fileData} readOnly={!isNewNote} isNewNote={isNewNote}/>
                    ): (
                        <h2 className={'bold text-orange-500 text-center'}>The File You have Requested is not found</h2>
                    )
                }
            </div>
        </>
)
}
export default CurrentNote