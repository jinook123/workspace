import React from 'react';
import { Form, Input, Slider, Switch, Col, InputNumber, Row } from 'antd';
import i18n from 'i18next';

export default {
	render(canvasRef, form, data) {
		const { getFieldDecorator } = form;

		let bConnectDB = data.property.bConnectDB;

		bConnectDB = true;

		return (
			<React.Fragment>
			{bConnectDB ? (
				<Row>
					<Col span={12}>
						<Form.Item label={i18n.t('common.delay')} colon={false}>
							{getFieldDecorator('property.showProperty.showDelay', {
								rules: [
									{
										type: 'number',
										min: 0,
										max: 5000,
									},
								],
								initialValue: data.property.showProperty.showDelay || 1000,
							})(<Slider min={0} max={5000} step={100} />)}
						</Form.Item>
					</Col>
				</Row>
			) : 
				<Row>
					<Col span={12}>
						<Form.Item label='Must Connect DB' colon={false}>
						</Form.Item>
					</Col>
				</Row>
			}
			</React.Fragment>
		);
	},
};
