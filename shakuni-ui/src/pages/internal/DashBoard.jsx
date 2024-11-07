import { useEffect } from "react"
import instance from "../../util/axios"
import { CONFIG_URL, VERSION_API } from "../../util/Constants";

export function DashBoard(){

    useEffect(()=>{
        instance.get(CONFIG_URL).then((response)=>{

        })
    },[])


    return <div>
        <h3>DashBoard</h3>
    </div>
}