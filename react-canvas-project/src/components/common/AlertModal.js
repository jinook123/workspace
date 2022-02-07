import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'antd';

class AlertModal extends Component {
	static propTypes = {
		alertVisible: PropTypes.bool.isRequired,
		msg: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		alertCancle: PropTypes.func,
	};

	state = {
		visible: false,
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.alertVisible !== this.props.alertVisible) {
			this.setState({
				visible: nextProps.alertVisible,
			});
		}
	}

	alertOk = () => {
		this.props.alertCancle();
		this.setState({visible: false});
	};

	alertCancel = () => {
		this.props.alertCancle();
		this.setState({visible: false});
	};

	render() {
		const { msg, title } = this.props;
		const { visible } = this.state;
		return (
			<Modal
				title={title}
				closable
				onCancel={this.alertCancel}
				onOk={this.alertOk}
				visible={visible}
			>
				<Form.Item
					label={msg}
					colon={false}
					hasFeedback
				>
				</Form.Item>
			</Modal>
		);
	}
}

export default Form.create()(AlertModal);
