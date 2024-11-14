import { Card, Divider, Tooltip } from 'antd';
import './datasources.css';
import Meta from 'antd/es/card/Meta';

export default function DataSourceItem({ params }) {

    return <Tooltip arrow={false} placement="topLeft" title={params.active ? '' : 'Inactive DataSource'} color='black' >
        <Card
            hoverable={params.active ? true : false}
            key={params.id}
            cover={<img src={params.dataSourceImageUrl} style={{height: '100px', width: '100px', position: 'relative', left: '50%', top: '50%', transform: 'translate(-50%,20px)', filter: params.active ? 'none' : 'grayscale(1)' }} />}
            style={{width: 240, backgroundColor: params.active ? 'none' : '#80808069', border: params.active ? '1px solid gray' : 'none' }}
        >
            <Divider style = {{borderColor: params.active ? 'gray' : '#ffffff70'}}  />
            <Meta title={params.dataSourceLabel}></Meta>
        </Card>
    </Tooltip>

}

