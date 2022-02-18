import React, { Component } from 'react';
import { Button, Table, Modal, Input, Form } from 'antd';
import Icon from '../../components/icon/Icon';

class DBMngtTable extends Component<any> {
	state = {
		visible: false,
		mode: 'none',
		activeIndex:0,
		num: 0,
		dbListAll:[]
	};

	render() {
        const {getDBList, } = this.props;
		const columns = [
			{
				key: 'num',
				title: 'Num',
				dataIndex: 'num',
			},
			{
				key: 'name',
				title: 'Name',
				dataIndex: 'name',
			},
			{
				key: 'src',
				title: 'Src',
				dataIndex: 'src',
			},
			{
				key: 'host',
				title: 'Host',
				dataIndex: 'host',
			},
			{
				title: 'Port',
				dataIndex: 'port',
			},
			{
				key: 'db',
				title: 'DB',
				dataIndex: 'db',
			},
			{
				key: 'des',
				title: 'Description',
				dataIndex: 'des',
			},
			{
				key: 'action',
				title: '',
				dataIndex: 'action',
				render: (text,record,index) => {
					return (
						<div>
 							<Button className="rde-action-btn" shape="circle" id={record.num} onClick={onModify}>
								<Icon name="edit" />
							</Button>
							<Button className="rde-action-btn" shape="circle" id={record.num} onClick={onDelete}>
								<Icon name="times" />
							</Button>
						</div>
					);
				},
			},
		];        
		return (

                <Table
                size="small"
                pagination={{
                    pageSize: 10,
                }}
                columns={columns}
                dataSource={dbListAll}
                rowKey="num"
                onRow = {(record, index) => { return {onClick: () =>{this.setState({activeIndex:index});/* console.log('index='+index); */}}}}
                />
        )
    }
}

export default DBMngtTable;
