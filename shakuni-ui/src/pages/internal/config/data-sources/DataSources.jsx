import { useEffect, useState } from 'react';
import './datasource-service.js';
import './datasources.css';
import { fetchDataSourceTypes } from './datasource-service.js';
import { Divider } from 'antd';
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
        <h2 className='datasources-headline'>Data Sources</h2>
        <Divider style={{borderColor: '#000000',margin:'10px'}} />
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