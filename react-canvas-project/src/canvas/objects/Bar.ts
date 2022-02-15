import { fabric } from 'fabric';
import { v4 } from 'uuid';

import { FabricObject } from '../utils';

export interface BarObject extends FabricObject<fabric.Group> {
	errorFlag?: fabric.IText;
	label?: fabric.Text;
	errors?: any;
	descriptor?: Record<string, any>;
	nodeClazz?: string;
	configuration?: Record<string, any>;
	setErrors?: (errors: any) => void;
	duplicate?: () => BarObject;
}

const BAR_WIDTH = 15;
const BAR_HEIGHT = 200;
const BAR_OFFSET = 2;

const BarComponent = fabric.util.createClass(fabric.Group, {
	type: 'Bar',
	superType: 'Bar',
	initialize(options: any) {
		options = options || {};
		let name = '10%';
		this.label = new fabric.Text(name || '%', {
			fontSize: 12,
			fontFamily: 'polestar',
			fontWeight: 800,
			fill: 'rgba(0, 0, 0, 1)',
		});
		// 외부 rect
		const outerRect = new fabric.Rect({
			width: BAR_WIDTH + BAR_OFFSET,
			height: BAR_HEIGHT + BAR_OFFSET,
			fill: 'rgba(255, 255, 255, 0.3)',
			stroke: 'rgba(0, 0, 0, 0.5)',
			strokeWidth: 2,
		});
		// 내부 rect
		const innerRect = new fabric.Rect({
			width: BAR_WIDTH,
			height: 20,
			left: outerRect.left + BAR_OFFSET,
			top: outerRect.top + outerRect.height - 20 - BAR_OFFSET + 2,
			fill: options.fill || 'rgba(0, 0, 0, 0.3)',
			stroke: options.stroke || 'rgba(0, 0, 0, 0)',
			strokeWidth: 0,
		});
		this.errorFlag = new fabric.IText('\uf071', {
			fontFamily: 'Font Awesome 5 Free',
			fontWeight: 900,
			fontSize: 14,
			fill: 'rgba(255, 0, 0, 0.8)',
			visible: options.errors,
		});
		const bar = [outerRect, innerRect, this.label, this.errorFlag];
		const option = Object.assign({}, options, {
			id: options.id || v4(),
			width: BAR_WIDTH,
			height: BAR_HEIGHT,
			originX: 'left',
			originY: 'top',
			outerRect: outerRect,
			innerRect: innerRect,
			hasRotatingPoint: false,
			hasControls: false,
		});
		this.callSuper('initialize', bar, option);
		this.label.set({
			top: this.label.top + this.label.height / 2 + 4,
			left: this.label.left + BAR_WIDTH + BAR_OFFSET * 2,
		});
		this.errorFlag.set({
			left: outerRect.left,
			top: outerRect.top,
			visible: options.errors,
		});
	},
	toObject() {
		return fabric.util.object.extend(this.callSuper('toObject'), {
			id: this.get('id'),
			name: this.get('name'),
			icon: this.get('icon'),
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
		if (errors) {
			this.errorFlag.set({
				visible: true,
			});
		} else {
			this.errorFlag.set({
				visible: false,
			});
		}
	},
	duplicate() {
		const options = this.toObject();
		options.id = v4();
		options.name = `${options.name}_clone`;
		return new BarComponent(options);
	},
	_render(ctx: CanvasRenderingContext2D) {
		this.callSuper('_render', ctx);
	},
});

// @ts-ignore
window.fabric.Bar = BarComponent;

export default BarComponent;
