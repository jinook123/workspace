import { fabric } from 'fabric';
import { v4 } from 'uuid';

import { FabricObject } from '../utils';

export interface TextObject extends FabricObject<fabric.Group> {
	label?: fabric.Textbox;
	errors?: any;
	descriptor?: Record<string, any>;
	nodeClazz?: string;
	configuration?: Record<string, any>;
	setErrors?: (errors: any) => void;
	duplicate?: () => TextObject;
}
/*
const TextComponent = new fabric.Textbox('',{
	width: 60,
	height : 35,
	fontFamily: 'Times New Roman',
	fontSize: 32,
	fontStyle: 'normal',
	fontWeight: 'normal',
	stroke: 'rgba(255, 255, 255, 0)',
	fill: 'rgb(0,0,0)',
});
*/
const TextComponent = fabric.util.createClass(fabric.Group,{
	type: 'TextCustom',
	superType: 'DataComp',
    initialize(options: any) {
		options = options || {};
		//let initText = 'Type Here';
		console.log('TextCustom Initialize...');
		this.label = new fabric.Textbox('', {
			width: 150,
			height : 35,
			fontFamily: 'Times New Roman',
			fontSize: 32,
			fontStyle: 'normal',
			fontWeight: 'normal',
			stroke: 'rgba(255, 255, 255, 0)',
			fill: 'rgb(0,0,0)',
		});
		const option = Object.assign({}, options, {
			id: options.id || v4(),
			originX: 'left',
			originY: 'top',
			hasRotatingPoint: false,
			hasBorders: true,
			hasControls: true
		});
		const textCustom = [this.label];
		this.callSuper('initialize', textCustom, option);
	},
	toObject() {
		return fabric.util.object.extend(this.callSuper('toObject'), {
			id: this.get('id'),
			name: this.get('name'),
			icon: this.get('icon'),
			text:this.get('text'),
			description: this.get('description'),
			superType: this.get('superType'),
			configuration: this.get('configuration'),
			nodeClazz: this.get('nodeClazz'),
			descriptor: this.get('descriptor'),
			borderColor: this.get('borderColor'),
			borderScaleFactor: this.get('borderScaleFactor'),
			dblclick: this.get('dblclick'),
			deletable: this.get('deletable'),
			cloneable: this.get('cloneable'),
		});
	},
	setErrors(errors: any) {
		this.set({
			errors,
		});
	},
	duplicate() {
		const options = this.toObject();
		options.id = v4();
		options.name = `${options.name}_clone`;
		return new TextComponent(options);
	},
	_render(ctx: CanvasRenderingContext2D) {
		this.callSuper('_render', ctx);
	},	
});
// @ts-ignore
window.fabric.TextCustom = TextComponent;

export default TextComponent;
