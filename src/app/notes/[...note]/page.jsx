import fs from "fs";
import path from "path";

import MarkDown from "@/components/MarkDown";
const basePath=path.resolve("src/docs")
import './styles.css'
const CurrentNote=async ({params})=>{
   const {note}=params;
   let not_found=false,fileData;
    let filePath=""
    note.forEach((path,index)=>{
        let append=index===note.length-1?'':'/'
        filePath=filePath+path+append
    })
    let finalPath=decodeURIComponent(path.resolve(basePath,filePath+".md"))
    try {
        fileData=fs.readFileSync(finalPath,'utf8')
    }catch (e) {
        console.log(e)
    }

    const allFileLinks=[]
    return (
        <>
            <div className="file_content">
                {
                    fileData?(
                        <MarkDown data={fileData}/>
                    ): (
                    <h2 className={'bold text-orange-500 text-center'}>The File You have Requested is not found</h2>
                    )
                }
            </div>
        </>
)
}
export default CurrentNote