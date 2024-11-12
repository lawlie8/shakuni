import { useEffect, useState } from 'react';
import './datasource-service.js';
import './datasources.css';
import { fetchDataSourceTypes } from './datasource-service.js';
export default function DataSources(params = {params}){

    const [datasourceType,setDataSourceType] = useState([]);

    useEffect(()=>{
        fetchDataSourceTypes().then((response)=>{
            setDataSourceType(response.data)
            console.log(response.data);
        }).catch((error)=>{
            console.log(error);
        })
    },[])

    return <div className="datasources-main">
        {
        datasourceType.map((item)=>(
            <div key={item.id} className='datasource-item'>

            </div>
    ))
    }
    </div>

}