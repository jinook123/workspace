import React from 'react';
import { Form, Input, Button } from 'antd';
import i18n from 'i18next';
import Icon from '../../../components/icon/Icon';

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

				<Button
					block
					size="small"
					onClick={() => {
						if(data.property.dbInfo.dbHost == "" || data.property.dbInfo.dbId == "" || data.property.dbInfo.dbPw == ""){
							alert('Must Input DB Information');
							return false;
						}
						data.property.bConnectDB = true;
						fetch("http://localhost:3001/component/test", {
							method : "post", 
							headers : {
								"content-type" : "application/json",
							},
							body : JSON.stringify(data.property.dbInfo),
						}).then((res)=>res.json()) .then((json)=>{
							console.log("return json");
							console.log(json);

							data.property.bConnectDB = true;
						});
					}}
				>
					<Icon name="play" style={{ marginRight: 8 }} />
					{'연결'}
    </Button>
    </React.Fragment>
		);
	},
};
