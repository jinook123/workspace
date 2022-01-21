import React from 'react';
import { Form, Input, Slider, Switch, Col, InputNumber, Row } from 'antd';
import i18n from 'i18next';

export default {
	render(canvasRef, form, data) {
		const { getFieldDecorator } = form;
		return (
			<React.Fragment>
				<Form.Item label='Equipment ID' colon={false}>
					{getFieldDecorator('property.baseInfo.equipmentId', {
						rules: [
							{
								required: true
							}
						],
						initialValue: data.property.baseInfo.equipmentId || ''
					})(<Input />)}
				</Form.Item>
				<Form.Item label='Equipment Name' colon={false}>
					{getFieldDecorator('property.baseInfo.equipmentName', {
						rules: [
							{
								required: true
							}
						],
						initialValue: data.property.baseInfo.equipmentName || ''
					})(<Input />)}
				</Form.Item>
			</React.Fragment>
		);
	},
};
