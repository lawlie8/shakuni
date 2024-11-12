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
        <h2 style={{color:'black'}}>Data Sources</h2>
        {
        datasourceType.map((item)=>(
            <div key={item.id} className='datasource-item'>
                <img className='datasource-item-icon' src={item.dataSourceImageUrl}></img>
                <h4 className='datasource-item-name'>{item.dataSourceLabel}</h4>
            </div>
    ))
    }
    </div>

}