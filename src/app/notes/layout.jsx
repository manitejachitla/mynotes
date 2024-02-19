
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import './styles.css'
import MarkDown from "@/components/MarkDown.jsx";
import SideBar from "@/components/SideBar";
const pathname=path.resolve("src/docs")
let fileData=fs.readFileSync(pathname+"/index.md",'utf8')
import Head from "next/head";
const allFileData=[]
export const metadata = {
    title: "My Notes2",
    description: "Personal Notes2",
};

const getDirectoryData=(curr_path)=>{
    let returnObj=[]
    const currPathFiles=fs.readdirSync(curr_path)
    currPathFiles.forEach(file=>{
        let next_path=path.join(curr_path,file)
        let fileStats=fs.lstatSync(next_path),isFile=fileStats.isFile()
        returnObj.push({
            name:file,
            isFile,
            path:next_path,
            children:isFile?null:getDirectoryData(next_path)
        })
    })

    return returnObj;
}
const getAllFilesData=(curr_path)=>{
    const currPathFiles=fs.readdirSync(curr_path)
    currPathFiles.forEach(file=>{
        let next_path=path.join(curr_path,file)
        let fileStats=fs.lstatSync(next_path),isFile=fileStats.isFile()
        allFileData[file]={
            name:file,
            isFile,
            path:next_path,
            children:isFile?null:getDirectoryData(next_path)
        }
    })
}
getAllFilesData(pathname)
export default function RootLayout({ children }) {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://prismjs.com/assets/assets/style.css"/>
                <link rel="stylesheet" href="https://prismjs.com/assets/themes/prism.css" data-noprefix/>
                <script src="https://prismjs.com/assets/assets/vendor/prefixfree.min.js"></script>
            </Head>
            <div className="mn_full_page">
                <div className="file_menu">
                    <SideBar data={allFileData} basepath={pathname}/>
                </div>
                {children}
                <div className="file_links"></div>
            </div>
        </>
    );
}
