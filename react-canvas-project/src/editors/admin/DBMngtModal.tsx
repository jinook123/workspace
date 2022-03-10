import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button,Modal, Input, Form } from 'antd';

class DBMngtModal extends Component<any> {

	constructor(props) {
		super(props);
		this.state = {
            visible: false,
            mode: 'none',
            activeIndex:0,  
            connStatus : '',
            /* 
            num: '',
            name: '',
            src: '',
            host: '',
            port: '',
            db: '',
            des: '' */
            tmpList:[]
        };    
	  }
	static propTypes = {
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
        onChange: PropTypes.func,
    }

    handleClick = () => {
        const { num } = this.props;
        const { name, src, host, port, db, des } = this.state;
        const contact = { name, phone };
        this.props.onModify(contact);
        this.setState({
          name: "",
          phone: "",
        });        
        this.props.onOk(item);
    }

    handleSubmit = (e,item) => {
        this.props.onOk(item);
    }

    handleChange = (e) => {
        const nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

	render() {
        const {onOk, onCancel,visible, dbListAll} = this.props;
        return (
            <Modal onOk={onOk} onCancel={onCancel} visible={visible}>
                <Form>
                    <label>NAME</label>
                    <Input name="name" value={this.state.name} onChange={onChange} />
                    {/* <input type="text" name="name" onChange={this.onChange}></input> */}
                    <label>SRC</label>
                    <Input name="src" value={this.state.src} onChange={onChange} />
                    <label>HOST</label>
                    <Input name="host" value={this.state.host} onChange={onChange} />
                    <label>PORT</label>
                    <Input name="port" value={this.state.port} onChange={onChange} />
                    <label>DB</label>
                    <Input name="db" value={this.state.db} onChange={onChange} />
                    <label>Description</label>
                    <Input name="des" value={this.state.des} onChange={onChange} />
                </Form>
                </Modal>
            )}
}
export default DBMngtModal;
