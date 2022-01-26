import React, { Component } from 'react';
import i18n from 'i18next';
import Canvas, { CanvasInstance } from '../../../canvas/Canvas';
import { Flex } from '../../../components/flex';
import { CommonButton } from '../../../components/common';
import { random } from 'lodash';

interface IProps {
	canvasRef?: CanvasInstance;
	selectedItem?: any;
	workflow?: any;
	onClick?: any;
}

class NodeAction extends Component<IProps> {
	// timerList: Map<String, any> = new Map();
	render() {
		const { canvasRef, selectedItem, onClick } = this.props;
		return (
			<Flex justifyContent="center" alignItems="flex-end" flex="1">
				<Flex.Item alignSelf="flex-start">
					<CommonButton
						icon="clone"
						onClick={() => {
							canvasRef.handler.duplicate();
						}}
					>
						{i18n.t('action.clone')}
					</CommonButton>
				</Flex.Item>
				<Flex.Item alignSelf="flex-end">
					<CommonButton
						icon="trash"
						type="danger"
						onClick={() => {
							canvasRef.handler.remove();
						}}
					>
						{i18n.t('action.delete')}
					</CommonButton>
				</Flex.Item>
				<Flex.Item alignSelf="flex-start">
					<CommonButton
						icon="play"
						disabled={selectedItem.configuration.bStart}
						onClick={() => {
							if(selectedItem.configuration.equipmentId === '' || selectedItem.configuration.equipmentName === '' || selectedItem.configuration.dbList === '' || selectedItem.configuration.dbTableList === ''){
								alert('Must Input Information');
								return false;
							}
							onClick('play', selectedItem);
						}}
					>
						{i18n.t('action.start')}
					</CommonButton>
				</Flex.Item>
				<Flex.Item alignSelf="flex-start">
					<CommonButton
						icon="stop"
						disabled={!selectedItem.configuration.bStart}
						onClick={() => {
							onClick('stop', selectedItem);
						}}
					>
						{i18n.t('action.stop')}
					</CommonButton>
				</Flex.Item>
			</Flex>
		);
	}
}

export default NodeAction;
