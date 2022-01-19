import React from 'react';
import { Form, Input, Slider, Switch, Col, InputNumber, Row } from 'antd';
import i18n from 'i18next';

export default {
	render(canvasRef, form, data) {
		const { getFieldDecorator } = form;
		return (
			<React.Fragment>
				<Form.Item label={i18n.t('dbInfo.dbHost')} colon={false}>
					{getFieldDecorator('property.dbInfo.dbHost', {
						rules: [
							{
								required: true
							}
						],
						initialValue: data.property.dbInfo.dbHost || ''
					})(<Input />)}
				</Form.Item>
				<Form.Item label={i18n.t('dbInfo.dbPort')} colon={false}>
					{getFieldDecorator('property.dbInfo.dbPort', {
						rules: [
							{
								required: true
							}
						],
						initialValue: data.property.dbInfo.dbPort || 21
					})(<Input />)}
				</Form.Item>
				<Form.Item label={i18n.t('dbInfo.dbId')} colon={false}>
					{getFieldDecorator('property.dbInfo.dbId', {
						rules: [
							{
								required: true
							}
						],
						initialValue: data.property.dbInfo.dbId || 'root'
					})(<Input />)}
				</Form.Item>
				<Form.Item label={i18n.t('dbInfo.dbPw')} colon={false}>
					{getFieldDecorator('property.dbInfo.dbPw', {
						rules: [
							{
								required: true
							}
						],
						initialValue: data.property.dbInfo.dbPw || ''
					})(<Input />)}
				</Form.Item>
				<Form.Item label={i18n.t('dbInfo.dbQuery')} colon={false}>
					{getFieldDecorator('property.dbInfo.dbQuery', {
						initialValue: data.property.dbInfo.dbQuery || ''
					})(<Input />)}
				</Form.Item>
			</React.Fragment>
		);
	},
};
