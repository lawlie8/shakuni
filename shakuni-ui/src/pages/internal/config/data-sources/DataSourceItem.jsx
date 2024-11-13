import { Card, Divider, Tooltip } from 'antd';
import './datasources.css';
import Meta from 'antd/es/card/Meta';

export default function DataSourceItem({ params }) {

    return <Tooltip arrow={false} placement="topLeft" title={params.active ? '' : 'Data Source Not Active'} color='rgba(128, 128, 128, 0.41)' style={{color:'black'}}>
        <Card
            hoverable={params.active ? true : false}
            key={params.id}
            cover={<img src={params.dataSourceImageUrl} style={{ height: '100px', width: '100px', position: 'relative', left: '50%', top: '50%', transform: 'translate(-50%,20px)', filter: params.active ? 'none' : 'grayscale(1)' }} />}
            style={{ width: 240, backgroundColor: params.active ? 'none' : '#80808069', border: params.active ? '1px solid #f0f0f0' : 'none' }}
        >
            <Divider style = {{borderColor: params.active ? '' : '#ffffff70'}}  />
            <Meta title={params.dataSourceLabel}></Meta>
        </Card>
    </Tooltip>

}

