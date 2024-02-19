import fs from 'fs'
import path from 'path'
import './styles.css'
import MarkDown from "@/components/MarkDown.jsx";
const pathname=path.resolve("src/docs")
let fileData=fs.readFileSync(pathname+"/index.md",'utf8')


const Notes=async ()=>{
    return (
        <div className="file_content">
            <MarkDown data={fileData}/>
        </div>
    )
}

export default Notes;