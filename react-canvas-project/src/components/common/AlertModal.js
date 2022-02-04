import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Radio } from 'antd';
import i18n from 'i18next';

class AlertModal extends Component {
	static propTypes = {
		onOk: PropTypes.func.isRequired,
		onCancel: PropTypes.func,
		visible: PropTypes.bool.isRequired,
	};

	state = {
		loadType: 'file',
		visible: false,
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.visible !== this.props.visible) {
			this.setState({
				visible: nextProps.visible,
			});
		}
	}

	alertOk = () => {
		const { onOk } = this.props;
		onOk('confirm');
	};

	alertCancel = () => {
		const { onCancel } = this.props;
		if (onCancel) {
			onCancel();
			return;
		}
		this.setState({
			visible: false,
		});
	};

	render() {
		const { text } = this.props;
		const { loadType, visible } = this.state;
		return (
			<Modal
				title={i18n.t('imagemap.svg.add-svg')}
				closable
				onCancel={this.alertCancel}
				onOk={this.alertOk}
				visible={visible}
			>
				<Form.Item
					label={text}
					colon={false}
					hasFeedback
				>
				</Form.Item>
			</Modal>
		);
	}
}

export default Form.create()(SVGModal);
