import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Title from './components/layout/Title';
import FlowContainer from './containers/FlowContainer';
import { ImageMapEditor, WorkflowEditor, DashBoardEditor, DBMngtBoard } from './editors';
import { AlertModal } from './components/common';

type EditorType = 'imagemap' | 'workflow' | 'dashboard' | 'admin';

interface IState {
	activeEditor?: EditorType;
<<<<<<< HEAD
	alertVisible?: boolean;
	alertMsg?: string;
	alertTitle?: string;
	loadedJson?: any;
	dbList?: any,
	dbTableList?: any,
=======
	bUpdateFlag?: boolean;
	alertVisible?: boolean;
	alertMsg?: string;
	alertTitle?: string;
>>>>>>> branch2
}

class App extends Component<any, IState> {
	state: IState = {
		activeEditor: 'dashboard',
<<<<<<< HEAD
		alertVisible: false,
		alertMsg: "",
		alertTitle: "",
		loadedJson: null,
		dbList: null,
		dbTableList: null,
=======
		bUpdateFlag: false,
		alertVisible: false,
		alertMsg: "",
		alertTitle: ""
>>>>>>> branch2
	};

	dbList: any = [];
	dbTableList: any = [];
	// loadedJson: any = null;
	bFlag: boolean = false;

	handleChangeEditor = ({ key }) => {
		this.setState({
			activeEditor: key,
		});
	};

	alertBox = (title, msg) => {
		this.setState({alertTitle: title, alertMsg: msg, alertVisible: true});
	}
	
	alertCancle = () => {
		this.setState({alertTitle: "", alertMsg: "msg", alertVisible: false});
	}
	
	getDBList() {
		this.dbList = [];

		const promise = fetch('http://localhost:3001/api/DBList', {
			method: 'post',
			headers: {
				'content-type': 'application/json',
			},
		});

		return promise
			.then(res => res.json())
			.then(json => {
				console.log('return DBList');
				console.log(json);

				json.forEach(element => {
					this.dbList.push({ label: element.name, value: element.db });
				});
			});
	}

	getDBTableList() {
		const data = {
			db: 'react',
		};
		this.dbTableList = [];

		const promise = fetch('http://localhost:3001/api/readTb', {
			method: 'post',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		return promise
			.then(res => res.json())
			.then(json => {
				console.log('return readTb react');
				console.log(json);

				json.forEach(element => {
					this.dbTableList.push({ label: element.Tables_in_react, value: element.Tables_in_react });
				});
<<<<<<< HEAD
		});
=======
			});
>>>>>>> branch2
	}

	getDBInfo() {
		console.log("get DBInfo");
		if (this.bFlag == true) {
<<<<<<< HEAD
=======
			console.log('this bFLag is false');
>>>>>>> branch2
			this.bFlag = false;
		} else {
			const promiseDB = this.getDBList();
			const promiseTable = this.getDBTableList();

			Promise.all([promiseDB, promiseTable]).then(() => {
<<<<<<< HEAD
=======
				console.log('this bFLag is true');
>>>>>>> branch2
				this.bFlag = true;
				this.setState({ dbTableList: this.dbTableList, dbList: this.dbList });
			});
		}
	}

	getWorkFlowJson() {
		if (this.bFlag == true) {
<<<<<<< HEAD
			console.log('this bFLag is false');
			this.bFlag = false;
		} else {
			const data = {
				num: 3,
			};
=======
			this.bFlag = false;
		} else {
			const data = {
				num: 1,
			};

			this.loadedJson = null;
>>>>>>> branch2

			const promise = fetch('http://localhost:3001/api/jsonLoad', {
				method: 'post',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			promise
				.then(res => res.json())
				.then(json => {
					console.log('return workFlow Json');
					console.log(json);
					this.bFlag = true;
					if(json.length != 0){
<<<<<<< HEAD
						this.setState({loadedJson: JSON.parse(json[0].json)});
					}
			});
=======
						this.loadedJson = JSON.parse(json[0].json);
					}
					this.setState({ bUpdateFlag: !this.state.bUpdateFlag });
					// this.forceUpdate();
				});
>>>>>>> branch2
		}
	}

	renderEditor = (activeEditor: EditorType) => {
		switch (activeEditor) {
			case 'dashboard':
				this.getWorkFlowJson();
<<<<<<< HEAD
				return <DashBoardEditor loadedJson={this.state.loadedJson} alertBox={(this.alertBox)} />;
=======
				return <DashBoardEditor loadedJson={this.loadedJson} alertBox={(this.alertBox)} />;
>>>>>>> branch2
			case 'imagemap':
				return <ImageMapEditor alertBox={(this.alertBox)} />;
			case 'workflow':
				this.getDBInfo();
				return <WorkflowEditor dbList={this.dbList} dbTableList={this.dbTableList} alertBox={(this.alertBox)} />;
			case 'admin':
				return <DBMngtBoard alertBox={(this.alertBox)} />;
				break;
		}
	};

	render() {
		const { activeEditor } = this.state;
		return (
			<div className="rde-main">
				<Helmet>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta
						name="description"
						content="React Design Editor has started to developed direct manipulation of editable design tools like Powerpoint, We've developed it with react.js, ant.design, fabric.js "
					/>
					<link rel="manifest" href="./manifest.json" />
					<link rel="shortcut icon" href="./favicon.ico" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css" />
					<title>React Design Editor</title>
					<script async={true} src="https://www.googletagmanager.com/gtag/js?id=UA-97485289-3" />
					<script>
						{`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'UA-97485289-3');
                        `}
					</script>
					<script async={true} src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
				</Helmet>
				<div className="rde-title">
					<Title onChangeEditor={this.handleChangeEditor} currentEditor={activeEditor} />
				</div>
				<FlowContainer>
					<div className="rde-content">{this.renderEditor(activeEditor)}</div>
				</FlowContainer>
				<AlertModal alertVisible={this.state.alertVisible} msg={this.state.alertMsg} title={this.state.alertTitle} alertCancle={this.alertCancle}></AlertModal>
			</div>
		);
	}
}

export default App;