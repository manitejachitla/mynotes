
import fs from 'fs'
import path from 'path'
import './styles.css'
import SideBar from "@/components/SideBar";
const pathname=path.resolve("src/docs")
let fileData=fs.readFileSync(pathname+"/index.md",'utf8')
import Head from "next/head";
let allFileData=[]
export const metadata = {
    title: "My Notes2",
    description: "Personal Notes2",
};

const getDirectoryData=async (curr_path)=>{
    let returnObj=[]
    const currPathFiles=fs.readdirSync(curr_path)
    for await(const file of currPathFiles){
        let next_path=path.join(curr_path,file)
        let fileStats=fs.lstatSync(next_path),isFile=fileStats.isFile()
        returnObj.push({
            name:file,
            isFile,
            path:path.relative(pathname,next_path),
            children:isFile?null:await getDirectoryData(next_path)
        })
    }

    return returnObj;
}
const getAllFilesData=async (curr_path)=>{
    const currPathFiles=fs.readdirSync(curr_path)
    let returnFiles={}
    for await(const file of currPathFiles){
        let next_path=path.join(curr_path,file)
        let fileStats=fs.lstatSync(next_path),isFile=fileStats.isFile()
        returnFiles[file]={
            name:file,
            isFile,
            path:path.relative(pathname,next_path),
            children:isFile?null:await getDirectoryData(next_path)
        }
    }

    return returnFiles;
}
const files=await getAllFilesData(pathname)
export default async function RootLayout({ children }) {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://prismjs.com/assets/assets/style.css"/>
                <link rel="stylesheet" href="https://prismjs.com/assets/themes/prism.css" data-noprefix/>
                <script src="https://prismjs.com/assets/assets/vendor/prefixfree.min.js"></script>
            </Head>
            <div className="mn_full_page">
                <div className="file_menu">
                    {
                        files?(
                            <SideBar data={files} basepath={pathname}/>
                        ):""
                    }
                </div>
                {children}
                <div className="file_links"></div>
            </div>
        </>
    );
}
