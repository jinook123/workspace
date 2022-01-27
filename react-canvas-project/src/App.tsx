import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Title from './components/layout/Title';
import FlowContainer from './containers/FlowContainer';
import { ImageMapEditor, WorkflowEditor, DashBoardEditor } from './editors';

type EditorType = 'imagemap' | 'workflow' | 'dashboard';

interface IState {
	activeEditor?: EditorType;
}

class App extends Component<any, IState> {
	state: IState = {
		activeEditor: 'dashboard'
	};

	dbList: any = [];
	dbTableList: any = [];
	loadedJson: any = null;

	handleChangeEditor = ({ key }) => {
		this.setState({
			activeEditor: key,
		});
	};

	componentDidMount(){
		this.getDBList();
		this.getDBTableList();
		this.getWorkFlowJson();
	}

	getDBList(){
		const promise = fetch("http://localhost:3001/api/DBList", {
			method : "post", 
			headers : {
				"content-type" : "application/json",
			}
		});

		promise.then((res)=>res.json()).then((json)=>{
			console.log("return DBList");
			console.log(json);

			this.dbList = [];
			json.forEach(element => {
				this.dbList.push({label: element.name, value: element.db});
			});
		});
	}

	getDBTableList(){
		const data = {
			db: "react"
		}
		const promise = fetch("http://localhost:3001/api/readTb", {
			method : "post", 
			headers : {
				"content-type" : "application/json",
			},
			body : JSON.stringify(data),
		});

		promise.then((res)=>res.json()).then((json)=>{
			console.log("return readTb react");
			console.log(json);

			this.dbTableList = [];
			json.forEach(element => {
				this.dbTableList.push({label: element.Tables_in_react, value: element.Tables_in_react});
			});
		});
	}

	getWorkFlowJson(){
		const data =  {
			
		};
		
		fetch("http://localhost:3001/api/jsonLoad", {
			method : "post", 
			headers : {
				"content-type" : "application/json",
			},
			body : JSON.stringify(data),
		}).then((res)=>res.json()) .then((json)=>{
			console.log("return json");
			console.log(json);

			// this.loadedJson = json;
		});
	}

	renderEditor = (activeEditor: EditorType) => {
		switch (activeEditor) {
			case 'dashboard':
				return <DashBoardEditor loadedJson={this.loadedJson} />;
			case 'imagemap':
				return <ImageMapEditor />;
			case 'workflow':
				return <WorkflowEditor dbList={this.dbList} dbTableList={this.dbTableList} />;
				break;
		}
	};

	render() {
		console.log("render");
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
			</div>
		);
	}
}

export default App;
