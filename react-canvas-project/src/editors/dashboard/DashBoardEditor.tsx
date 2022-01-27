import { message, Popconfirm } from 'antd';
import i18n from 'i18next';
import React, { Component } from 'react';
import Canvas, { CanvasInstance } from '../../canvas/Canvas';
import { CommonButton } from '../../components/common';
import { Content } from '../../components/layout';
import { getEllipsis, getNode } from './configuration/NodeConfiguration';
import Links from './link';
import Nodes from './node';
import DashBoardTitle from './DashBoardTitle';
import DashBoardToolbar from './DashBoardToolbar';


interface IState {
	loading: boolean;
	zoomRatio: number;
	workflow: any;
	selectedItem: any;
	descriptors: any;
	loadedJson: any;
}

class DashBoardEditor extends Component<any, IState> {
	state: IState = {
		loading: true,
		zoomRatio: 1,
		workflow: {},
		selectedItem: null,
		descriptors: {},
		loadedJson: null,
	};

	canvasRef: CanvasInstance;
	nodeConfigurationRef: any;
	container: any;

	timerList: Map<String, any> = new Map();

	componentDidMount() {
		import('./Descriptors.json').then(descriptors => {
			this.setState(
				{
					descriptors,
				},
				() => {
					this.hideLoading();
				},
			);
		});
		console.log("loadedJson");
		console.log(this.state.loadedJson);
		if(this.state.loadedJson != null){

		}
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
						if(obj.nodeClazz === 'EquipmentNode'){
							if(obj.configuration.equipmentId !== '' && obj.configuration.equipmentName !== '' && obj.configuration.dbList !== '' && obj.configuration.dbTableList !== ''){
								this.handlers.onClick('play', obj);
							}
						}
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
			let currentItem = {...selectedItem};

			if(typeof div !== 'undefined'){
				if(div === 'play'){
					selectedItem.configuration.bStart = true;

					if(this.timerList.has(currentItem.configuration.equipmentId) == false){
						const timer = setInterval(() => {
							console.log("timerStart");
		
							if(this.canvasRef != null && typeof this.canvasRef.canvas !== 'undefined'){
								this.canvasRef.handler.reloadCanvas(selectedItem);
							}
						
						}, currentItem.configuration.showDelay);
						
						this.timerList.set(currentItem.configuration.equipmentId, timer);
					}
				} else if(div === 'stop'){

					selectedItem.configuration.bStart = false;
					if(this.timerList.has(currentItem.configuration.equipmentId) == true){
						clearInterval(this.timerList.get(currentItem.configuration.equipmentId));
						this.timerList.delete(currentItem.configuration.equipmentId);
					}
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
