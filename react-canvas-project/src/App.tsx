import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Title from './components/layout/Title';
import FlowContainer from './containers/FlowContainer';
import { FiberEditor, FlowEditor, HexGridEditor, ImageMapEditor, WorkflowEditor, DashBoardEditor } from './editors';

type EditorType = 'imagemap' | 'workflow' | 'flow' | 'hexgrid' | 'fiber' | 'dashboard';

interface IState {
	activeEditor?: EditorType;
}

class App extends Component<any, IState> {
	state: IState = {
		activeEditor: 'dashboard'
	};

	dbList: any = [];
	dbTableList: any = [];

	handleChangeEditor = ({ key }) => {
		this.setState({
			activeEditor: key,
		});
	};

	getDBList(){
		this.dbList = [
			{
				label: 'mysql',
				value: 'mysql',
			},
			{
				label: 'oracle',
				value: 'oracle',
			},
			{
				label: 'mongodb',
				value: 'mongodb',
			}
		];
	}

	getDBTableList(){
		this.dbTableList = [
			{
				label: 'testTable1',
				value: 'testTable1',
			},
			{
				label: 'testTable2',
				value: 'testTable2',
			},
			{
				label: 'testTable3',
				value: 'testTable3',
			}
		];
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
		});
	}

	renderEditor = (activeEditor: EditorType) => {
		
		switch (activeEditor) {
			case 'dashboard':
				return <DashBoardEditor />;
			case 'imagemap':
				return <ImageMapEditor />;
			case 'workflow':
				this.getDBList();
				this.getDBTableList();
				return <WorkflowEditor dbList={this.dbList} dbTableList={this.dbTableList} />;
				break;
			case 'flow':
				return <FlowEditor />;
			case 'hexgrid':
				return <HexGridEditor />;
			case 'fiber':
				return <FiberEditor />;
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
			</div>
		);
	}
}

export default App;
