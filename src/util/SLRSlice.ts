const startDate = 1682510400000
const EndDate = 1694973600000



export function SLRSlice(data:any){
    
    return data.slice(data.indexOf(startDate),data.indexOf(EndDate))
}