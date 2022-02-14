import React, { Component } from 'react';
import { Button, Table, Modal, Input, Form } from 'antd';
import Icon from '../../components/icon/Icon';
import { Flex } from '../../components/flex';

class DBMngtBoard extends Component<any> {

	state = {
		visible: false,
		mode: 'none',
		activeIndex:0,
		num: 0,
		name: '',
		src: '',
		host: '',
		port: '',
		db: '',
		des: '',
		dbListAll:[],
		connStatus : ''
	};

	//리스트 초기화
	dbListAll : any = [];

	componentDidMount() {
		this.DBHandlers.getDBList();
	}


	DBHandlers = {
		//DB selectAll
		getDBList: () => {
			const request = fetch('http://localhost:3001/api/DBList', {
				method: 'post',
				headers: {
					'content-type': 'application/json',
				},
			});

			return request
				.then(res => res.json())
				.then(json => {
					console.log('return DBList');
					this.dbListAll=[];
					//this.dbListAll=json;

					this.setState({dbListAll : json});

					console.log(this.state.dbListAll);
				});
		},

		//DB Modify
		onModify: () => {
			//const id = e.target.id;
			const id=this.state.activeIndex;
			console.log('onModify...');
			console.log('id='+id);
			console.log(this.state.dbListAll[id]);
			const tmpList = this.state.dbListAll[id];

				this.modalHandlers.modalModify(tmpList);
		},

		//DB Delete
		onDelete: (e) => {
			const id = e.target.id;

			const request = fetch('http://localhost:3001/api/delDB', {
				method: 'post',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					num: id,
				}),
			});

			request
				.then(res =>  {
					console.log('delete DB. num=' + id);

					//refresh
					this.DBHandlers.getDBList();
				});

			//refresh
		},

		//param set
		onChange: e => {
			this.setState({
				[e.target.name]: e.target.value,
			});
			//console.log(this.state);
		},
	};

	submitHandlers = {
		onOk: () => {
			const { mode } = this.state;

			//mode (add : 추가 , modfiy : 수정)
			if (mode == 'add') {
				fetch('http://localhost:3001/api/addDB', {
					method: 'post',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify({
						name: this.state.name,
						src: this.state.src,
						host: this.state.host,
						port: this.state.port,
						db: this.state.db,
						des: this.state.des,
					}),
				})
					.then(res => {
						console.log('insert DBList');
						console.log(res);

					//refresh
					this.modalHandlers.modalHide();
					this.DBHandlers.getDBList();				
					});

			} else if (mode == 'modify') {
				fetch('http://localhost:3001/api/modDB', {
					method: 'post',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify({
						num: this.state.num,
						name: this.state.name,
						src: this.state.src,
						host: this.state.host,
						port: this.state.port,
						db: this.state.db,
						des: this.state.des,
					}),
				})
					.then(res => res.json())
					.then(json => {
						console.log('modify DB. id=' + json);

					//refresh
					this.modalHandlers.modalHide();
					this.DBHandlers.getDBList();
					});

			} else {
				console.log('[mode]' + mode);
				return;
			}
		},
		onCancel: () => {
			this.setState({
				name: '',
				src: '',
				host: '',
				port: '',
				db: '',
				des: '',
				connStatus : ''
			});
			this.modalHandlers.modalHide();
		},
		onConnect: () =>{

			this.setState({ loading: true });
			
			//임시테스트 readTb 호출
			fetch('http://localhost:3001/api/readTb', {
				method: 'post',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					src: this.state.src,
					host: this.state.host,
					port: this.state.port,
					db: this.state.db,
				}),
			})
				.then(res => res.status)
				.then(status => {
						
					if(status==200){
						console.log('connect Success');
						console.log(status);
						this.setState({connStatus : 'Success'});

					}else{
						//status==500
						console.log('connect Fail');
						console.log(status);
						this.setState({connStatus : 'Fail'});
					}
				});
		},
	};

	modalHandlers = {
		modalShow: () => {
			this.setState({
				visible: true,
			});
		},
		modalHide: () => {
			this.setState({
				visible: false,
			});
		},
		modalAdd: () => {
			this.setState({
				visible: true,
				mode: 'add',
			});
		},
		modalModify: (data) => {
			console.log('moalModify...');

 			this.setState({
				mode: 'modify',
				num : data.num,
				name : data.name,
				src : data.src,
				host : data.host,
				port : data.port,
				db : data.db,
				des : data.des,
			});
			
			this.modalHandlers.modalShow();
			
		},
	};

	render() {
        const { alertBox } = this.props;        
		const { dbListAll, visible, connStatus } = this.state;
		const { getDBList, onModify, onDelete, onChange } = this.DBHandlers;
		const { onOk, onCancel, onConnect } = this.submitHandlers;
		const { modalAdd } = this.modalHandlers;
		let TestConnection;

		if(connStatus == 'Success'){
			TestConnection = <Icon name="check-circle" />;
		} else if (connStatus == 'Fail') {
			TestConnection = <Icon type="exclamation" />;
		} else {
			TestConnection = "";
		}
		
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
			<div>
				<div>
					<Flex className="rde-content-layout-title" alignItems="center" flexWrap="wrap">
						<h2> DB List </h2>
					</Flex>
					<Flex justifyContent="center">
						<Modal
						 onOk={onOk} 
						 onCancel={onCancel} 
						 visible={visible}
						 footer={[
							<Button key="test" onClick={onConnect}>
								<span>Test Connection</span>
								{TestConnection}
							</Button>,
							<Button key="cancel" onClick={onCancel}>Cancel</Button>,
							<Button key="submit" onClick={onOk}>OK</Button>,
						]}>
							<Form>
								<label>NAME</label>
								<Input name="name" value={this.state.name} onChange={onChange} />
								<label>SRC</label>
								<Input name="src" value={this.state.src} onChange={onChange} />
								<label>HOST</label>
								<Input name="host" value={this.state.host} onChange={onChange} />
								<label>PORT</label>
								<Input name="port" value={this.state.port} onChange={onChange} />
								<label>DB</label>
								<Input name="db" value={this.state.db} onChange={onChange} />
								<label>Description</label>
								<Input name="des" value={this.state.des} onChange={onChange} />
							</Form> 
						</Modal>
					</Flex>
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
					<Button onClick={getDBList}>조회</Button>
					<Button onClick={modalAdd}>추가</Button>
				</div>
			</div>
		);
	}
}
export default DBMngtBoard;
