import { useEffect, useState } from 'react';
import './datasource-service.js';
import './datasources.css';
import { fetchDataSourceTypes } from './datasource-service.js';
import DataSourceItem from './DataSourceItem.jsx';
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
        {
        datasourceType.map((item)=>(
            <div className='datasource-item'>
                <DataSourceItem params = {item} />
            </div>
            ))
    }
    </div>

}