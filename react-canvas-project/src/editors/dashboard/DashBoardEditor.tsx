import { message, Popconfirm } from 'antd';
import i18n from 'i18next';
import React, { Component } from 'react';
import Canvas, { CanvasInstance } from '../../canvas/Canvas';
import { CommonButton } from '../../components/common';
import { Content } from '../../components/layout';
import { getEllipsis, getNode } from '../common/configuration/NodeConfiguration';
import Links from '../common/link';
import Nodes from '../common/node';
import DashBoardTitle from './DashBoardTitle';
import DashBoardToolbar from './DashBoardToolbar';


interface IState {
	loading: boolean;
	zoomRatio: number;
	workflow: any;
	selectedItem: any;
	descriptors: any;
}

class DashBoardEditor extends Component<any, IState> {
	state: IState = {
		loading: true,
		zoomRatio: 1,
		workflow: {},
		selectedItem: null,
		descriptors: {}
	};

	canvasRef: CanvasInstance;
	nodeConfigurationRef: any;
	container: any;

	timerList: Map<String, any> = new Map();

	componentDidMount() {
		import('../common/Descriptors.json').then(descriptors => {
			this.setState(
				{
					descriptors,
				},
				() => {
					this.hideLoading();

					const { loadedJson } = this.props;
					if(loadedJson != null){
						this.loadJson(loadedJson);
					}
				},
			);
		});
	}

	componentWillUnmount() {
		// timer end
		this.timerList.forEach(obj => {
			clearInterval(obj);
		});
	}

	handlers = {
		onImport: files => {
			if (files) {
				this.showLoading();
				const reader = new FileReader();
				reader.onload = e => {
					const result = JSON.parse(e.target.result as string);
					this.setState({
						workflow: result,
					});
					this.canvasRef.handler.clear();
					this.timerList.clear();
					const nodes = result.nodes.map(node => {
						return {
							...node,
							type: getNode(node.nodeClazz),
							left: node.properties ? node.properties.left : 0,
							top: node.properties ? node.properties.top : 0,
						};
					});
					const links = result.links.map(link => {
						return {
							fromNodeId: link.fromNode,
							fromPortId: link.fromPort,
							toNodeId: link.toNode,
							type: 'curvedLink',
							superType: 'link',
							left: link.properties ? link.properties.left : 0,
							top: link.properties ? link.properties.top : 0,
						};
					});
					const objects = nodes.concat(links);
					const { viewportTransform } = result.properties;
					if (viewportTransform) {
						this.canvasRef.canvas.setViewportTransform(viewportTransform);
					}
					this.canvasRef.handler.importJSON(objects, () => {
						this.hideLoading();
						this.canvasRef.canvas.setZoom(this.state.zoomRatio);
					});

					// timer start
					this.canvasRef.handler.getObjects().forEach(obj => {
						this.canvasRef.handler.timerStart(obj, this.canvasRef);
					});
				};
				reader.readAsText(files[0]);
			}
		},
		onUpload: () => {
			const inputEl = document.createElement('input');
			inputEl.accept = '.json';
			inputEl.type = 'file';
			inputEl.hidden = true;
			inputEl.onchange = (e: any) => {
				this.handlers.onImport(e.target.files);
			};
			document.body.appendChild(inputEl); // required for firefox
			inputEl.click();
			inputEl.remove();
		},
		
		onClick: (div, selectedItem) => {
			if(typeof div !== 'undefined'){
				if(div === 'play'){
					this.canvasRef.handler.timerStart(selectedItem, this.canvasRef);
				} else if(div === 'stop'){
					this.canvasRef.handler.timerStop(selectedItem);
				}
			}
		},
	};

	showLoading = () => {
		this.setState({
			loading: true,
		});
	};

	hideLoading = () => {
		this.setState({
			loading: false,
		});
	};

	loadJson = (json) => {
		const result = json;
		this.setState({
			workflow: result,
		});
		this.canvasRef.handler.clear();
		this.timerList.clear();
		const nodes = result.nodes.map(node => {
			return {
				...node,
				type: getNode(node.nodeClazz),
				left: node.properties ? node.properties.left : 0,
				top: node.properties ? node.properties.top : 0,
			};
		});
		const links = result.links.map(link => {
			return {
				fromNodeId: link.fromNode,
				fromPortId: link.fromPort,
				toNodeId: link.toNode,
				type: 'curvedLink',
				superType: 'link',
				left: link.properties ? link.properties.left : 0,
				top: link.properties ? link.properties.top : 0,
			};
		});
		const objects = nodes.concat(links);
		const { viewportTransform } = result.properties;
		if (viewportTransform) {
			this.canvasRef.canvas.setViewportTransform(viewportTransform);
		}
		this.canvasRef.handler.importJSON(objects, () => {
			this.hideLoading();
			this.canvasRef.canvas.setZoom(this.state.zoomRatio);
		});

		// timer start
		this.canvasRef.handler.getObjects().forEach(obj => {
			this.canvasRef.handler.timerStart(obj, this.canvasRef);
		});
	}

	render() {
		
		const { zoomRatio, workflow, selectedItem, descriptors, loading } = this.state;
		const { onUpload, onClick } = this.handlers;
		const nodes = Nodes(descriptors);

		const action = (
			<React.Fragment>
				<CommonButton
					className="rde-action-btn"
					shape="circle"
					icon="file-upload"
					tooltipTitle={i18n.t('action.upload')}
					tooltipPlacement="bottomRight"
					onClick={onUpload}
				/>
			</React.Fragment>
		);
		const titleContent = (
			<React.Fragment>
				<span>{i18n.t('dashboard.dashboard')}</span>
				<span style={{ width: 40, textAlign: 'center' }}>/</span>
				<span style={{ color: workflow.enabled ? '#49a9ee' : 'rgba(0, 0, 0, 0.65)' }}>{workflow.name}</span>
			</React.Fragment>
		);
		const title = <DashBoardTitle title={titleContent} action={action} />;
		const content = (
			<div className="rde-editor">
				<div
					ref={c => {
						this.container = c;
					}}
					className="rde-editor-canvas"
				>
					<Canvas
						ref={c => {
							this.canvasRef = c;
						}}
						className="rde-canvas"
						fabricObjects={{ ...nodes, ...Links }}
						workareaOption={{
							width: 0,
							height: 0,
						}}
						gridOption={{ enabled: true, grid: 20, snapToGrid: true }}
						activeSelectionOption={{
							hasControls: false,
							hasBorders: false,
							perPixelTargetFind: true,
						}}
						minZoom={50}
						maxZoom={150}
						keyEvent={{ move: false, transaction: true, clipboard: true }}
					/>
					<div className="rde-editor-toolbar">
						<DashBoardToolbar canvasRef={this.canvasRef} zoomRatio={zoomRatio} />
					</div>
				</div>
			</div>
		);
		return <Content title={title} content={content} loading={loading} className="" />;
	}
}

export default DashBoardEditor;
