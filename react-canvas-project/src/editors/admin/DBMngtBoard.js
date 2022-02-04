import React, { Component } from 'react';
import { Button, Table, Modal, Input, Form } from 'antd';
import Icon from '../../components/icon/Icon';
import { Flex } from '../../components/flex';

class DBMngtBoard extends Component {
	state = {
		tempKey: '',
		tempValue: '',
		visible: false,
		mode: '',
		name: '',
		src: '',
		host: 'localhost',
		port: '',
		db: '',
		des: '',
	};

	//리스트 초기화
	dblist = [];
	tmpList = [];

	DBHandlers = {
		//DB selectAll
		getDBList: () => {
			const request = fetch('http://localhost:3001/api/DBList', {
				method: 'post',
				headers: {
					'content-type': 'application/json',
				},
			});

			request
				.then(res => res.json())
				.then(json => {
					console.log('return DBList');

					this.dblist = json;

					this.setState({
						dblist: json,
					});
					console.log(this.dblist);
				});
		},

		//DB Modify
		onModify: e => {
			const id = e.target.id;

			//선택 id의 DB정보 불러오기
			const request = fetch('http://localhost:3001/api/selectOne', {
				method: 'post',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					num: id,
				}),
			});

			request
				.then(res => res.json())
				.then(json => {
					this.tmpList = [];

					json.forEach(element => {
						this.tmpList.push({
							num: element.num,
							name: element.name,
							src: element.src,
							host: element.host,
							port: element.port,
							db: element.db,
							des: element.des,
						});
					});

					this.setState({
						tmpList: json,
					});
					console.log('modify DB. num=' + id);
					this.modalModify();
				});
		},

		//DB Delete
		onDelete: e => {
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
				.then(res => res.json())
				.then(json => {
					console.log('delete DB. num=' + id);
					console.log(json);

					//refresh
					this.getDBList;
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
						console.log('insert DBList');
						console.log(json);
					});
				//refresh
				this.modalHandlers.modalHide();
				this.DBHandlers.getDBList();
			} else if (mode == 'modify') {
				fetch('http://localhost:3001/api/modDB', {
					method: 'post',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify({
						num: this.state.id,
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
						console.log('modify DB. id=' + id);
					});
				//refresh
				this.modalHandlers.modalHide();
				this.DBHandlers.getDBList();
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
			});
			this.modalHandlers.modalHide();
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
				tempKey: '',
				tempValue: '',
				mode: 'add',
				validateStatus: '',
				help: '',
				name: '',
				src: '',
				host: '',
				port: '',
				db: '',
				des: '',
			});
		},
		modalModify: () => {
			this.setState({
				visible: true,
				mode: 'modify',
			});
			console.log(Object.keys(this.dblist[0]));

			Object.keys(this.dblist[0]).forEach(element => {
				const key = element;
				const value = element.key;
				//console.log(Object.keys(this.dblist[0]).key);

				console.log(key);
				console.log(value);
			});
			this.setState({
				tempKey: tempValue,
			});
		},
	};
	render() {
		const { tmpList, visible } = this.state;
		const { getDBList, onModify, onDelete, onChange } = this.DBHandlers;
		const { onOk, onCancel } = this.submitHandlers;
		const { modalAdd, modalModify } = this.modalHandlers;

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
				render: (text, record) => {
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
			<div align="center">
				<div>
					<Flex className="rde-content-layout-title" alignItems="center" flexWrap="wrap">
						<h2> DB List </h2>
					</Flex>
					<Flex justifyContent="center">
						<Modal onOk={onOk} onCancel={onCancel} visible={visible} tmpList={tmpList}>
							<Form>
								<label>NAME</label>
								<Input name="name" value={this.state.name} onChange={onChange} />
								{/* <input type="text" name="name" onChange={this.onChange}></input> */}
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
						dataSource={this.dblist}
						rowKey="name"
					/>
					<Button onClick={getDBList}>조회</Button>
					<Button onClick={modalAdd}>추가</Button>
				</div>
			</div>
		);
	}
}
export default DBMngtBoard;
