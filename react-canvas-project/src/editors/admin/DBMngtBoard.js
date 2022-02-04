import React, { Component } from 'react';
import { Button, Table, Modal, Input, Form } from 'antd';
import Icon from '../../components/icon/Icon';
import { Flex } from '../../components/flex';

class DBManageEditor extends Component {
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

	//DB 조회
	getDBList = () => {
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
	};

	//DB 수정
	onModify = e => {
		const id = e.target.id;

		//수정대상 id의 DB정보 불러오기
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
				this.handleModify();
			});
	};

	//DB 삭제
	onDelete = e => {
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
			});

		//refresh
		this.getDBList();
	};

	//입력값 변경
	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
		//console.log(this.state);
	};

	//onOk(=onSubmit) : 추가 및 수정 , onCancel : 취소
	handlers = {
		onOk: () => {
			const { mode } = this.state;

			//추가
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
				//DB 리스트 갱신
				this.getDBList();
				this.modalHandlers.onHide();
			}
			//수정
			else if (mode == 'modify') {
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
				//DB 리스트 갱신
				this.getDBList();
				this.modalHandlers.onHide();
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
			this.modalHandlers.onHide();
		},
	};

	//모달
	modalHandlers = {
		onShow: () => {
			this.setState({
				visible: true,
			});
		},
		onHide: () => {
			this.setState({
				visible: false,
			});
		},
	};
	//모달 - DB 추가
	handleAdd = () => {
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
	};

	handleModify = () => {
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
	};

	render() {
		const { tmpList, visible } = this.state;
		const { onOk, onCancel } = this.handlers;
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
							<Button className="rde-action-btn" shape="circle" id={record.num} onClick={this.onModify}>
								<Icon name="edit" />
							</Button>
							<Button className="rde-action-btn" shape="circle" id={record.num} onClick={this.onDelete}>
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
								<Input name="name" value={this.state.name} onChange={this.onChange} />
								{/* <input type="text" name="name" onChange={this.onChange}></input> */}
								<label>SRC</label>
								<Input name="src" value={this.state.src} onChange={this.onChange} />
								<label>HOST</label>
								<Input name="host" value={this.state.host} onChange={this.onChange} />
								<label>PORT</label>
								<Input name="port" value={this.state.port} onChange={this.onChange} />
								<label>DB</label>
								<Input name="db" value={this.state.db} onChange={this.onChange} />
								<label>Description</label>
								<Input name="des" value={this.state.des} onChange={this.onChange} />
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
					<Button onClick={this.getDBList}>조회</Button>
					<Button onClick={this.handleAdd}>추가</Button>
				</div>
			</div>
		);
	}
}
export default DBManageEditor;
