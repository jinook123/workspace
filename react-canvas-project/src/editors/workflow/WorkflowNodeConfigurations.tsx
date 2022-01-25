import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Divider, Input } from 'antd';
import i18n from 'i18next';
import NodeDescriptor from './configuration/NodeDescriptor';
import NodeAction from './configuration/NodeAction';
import NodeConfiguration from './configuration/NodeConfiguration';
import Canvas, { CanvasInstance } from '../../canvas/Canvas';
import { Scrollbar } from '../../components/common';
import { Flex } from '../../components/flex';
import { FormComponentProps } from 'antd/lib/form';

interface IProps extends FormComponentProps {
	canvasRef?: CanvasInstance;
	selectedItem?: any;
	workflow?: any;
	onChange?: any;
	descriptors?: any;
	onClick?: any;
	dbList?: any;
	dbTableList?: any;
}

class WorkflowNodeConfigurations extends Component<IProps> {
	static propTypes = {
		canvasRef: PropTypes.any,
		selectedItem: PropTypes.object,
		workflow: PropTypes.object,
		descriptors: PropTypes.object,
		onChange: PropTypes.func,
		dbList: PropTypes.any,
		dbTableList: PropTypes.any,
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.props.selectedItem && nextProps.selectedItem) {
			if (this.props.selectedItem.id !== nextProps.selectedItem.id) {
				nextProps.form.resetFields();
			}
		}
	}

	render() {
		const { canvasRef, workflow, selectedItem, form, onClick, dbList, dbTableList } = this.props;
		return (
			<Scrollbar>
				<Form layout="horizontal">
					{selectedItem ? (
						<React.Fragment>
							{/* <NodeDescriptor workflow={workflow} selectedItem={selectedItem} /> */}
							{/* <Flex flexDirection="column" style={{ margin: '8px 16px' }}>
								<Form.Item label={i18n.t('common.name')} colon={false}>
									{form.getFieldDecorator('name', {
										initialValue: selectedItem.name,
										rules: [
											{
												required: true,
												message: i18n.t('validation.enter-property', {
													arg: i18n.t('common.name'),
												}),
											},
										],
									})(
										<Input
											minLength={0}
											maxLength={30}
											placeholder={i18n.t('workflow.node-name-required')}
										/>,
									)}
								</Form.Item>
								<Form.Item label={i18n.t('common.description')} colon={false}>
									{form.getFieldDecorator('description', {
										initialValue: selectedItem.description,
									})(
										<Input.TextArea
											style={{ maxHeight: 200 }}
											placeholder={i18n.t('workflow.node-description-required')}
										/>,
									)}
								</Form.Item>
							</Flex> */}
							<Divider>{i18n.t('workflow.node-configuration')}</Divider>
							<Flex
								flexDirection="column"
								style={{ height: '100%', overflowY: 'hidden', margin: '8px 16px' }}
							>
								<NodeConfiguration
									canvasRef={canvasRef}
									form={form}
									selectedItem={selectedItem}
									workflow={workflow}
									dbList={dbList}
									dbTableList={dbTableList}
								/>
							</Flex>
							<NodeAction workflow={workflow} selectedItem={selectedItem} canvasRef={canvasRef} onClick={onClick} />
						</React.Fragment>
					) : null}
				</Form>
			</Scrollbar>
		);
	}
}

export default Form.create<IProps>({
	onValuesChange: (props: IProps, changedValues, allValues) => {
		const { onChange, selectedItem } = props;
		onChange(selectedItem, changedValues, allValues);
	},
})(WorkflowNodeConfigurations);
