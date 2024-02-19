export const wait=(delay=500)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve()
        },delay)
    })
}
