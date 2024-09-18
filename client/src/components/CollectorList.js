import React from 'react'
import { Card, Space } from 'antd';
const CollectorList = ({collector}) => {
  return (
    <div>

      <div >
<div>
  { }
</div>

<Card
      title="Collector"
      extra={<a href="#">More</a>}
      style={{
        width: 300, margin:10
      }}
    >
      <p> {collector.firstName}</p>
      <p> {collector.lastName}</p>
    
    </Card>

      </div>
       
    </div>
  )
}

export default CollectorList