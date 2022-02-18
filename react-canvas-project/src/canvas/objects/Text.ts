import { fabric } from 'fabric';
import { v4 } from 'uuid';

import { FabricObject } from '../utils';

export interface TextObject extends FabricObject<fabric.Group> {
	errorFlag?: fabric.IText;
	TextBox?: fabric.Textbox;
	errors?: any;
	descriptor?: Record<string, any>;
	nodeClazz?: string;
	configuration?: Record<string, any>;
	setErrors?: (errors: any) => void;
	duplicate?: () => TextObject;    
}
const TextComponent = fabric.util.createClass(fabric.Group, {
	type: 'Text',
	superType: 'Text',
	initialize(options: any) {
		options = options || {};
        this.TextBox = new fabric.Textbox('No Text' ,{
            fontSize: 12,
			fontFamily: 'polestar',
			fontWeight: 800,
			fill: 'rgba(0, 0, 0, 1)',
		});
        this.errorFlag = new fabric.IText('\uf071', {
            fontFamily: 'Font Awesome 5 Free',
            fontWeight: 900,
            fontSize: 14,
            fill: 'rgba(255, 0, 0, 0.8)',
            visible: options.errors,
        });
        const TextBox = [this.TextBox, this.errorFlag];
        const option = Object.assign({}, options, {
            id: options.id || v4(),
            width: 800,
            height: 600,
            originX: 'left',
            originY: 'top',
            hasRotatingPoint: true,
            hasControls: true,
        });
        this.callSuper('initialize', TextBox, option);
        this.errorFlag.set({ 
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
        return new TextComponent(options);
    },
    _render(ctx: CanvasRenderingContext2D) {
        this.callSuper('_render', ctx);
    },
});

window.fabric.Text = TextComponent;

export default TextComponent;
