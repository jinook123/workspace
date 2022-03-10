import { fabric } from 'fabric';

import { NODE_COLORS } from '../../constant/constants';
import { TextComponent } from '../../../../canvas/objects';

const TextNode = fabric.util.createClass(TextComponent, {
	initialize(options) {
		options = options || {};
		options.fill = NODE_COLORS.DATA.fill;
		options.stroke = NODE_COLORS.DATA.border;
		this.callSuper('initialize', options);
	},
});

TextNode.fromObject = function(options, callback) {
	return callback(new TextNode(options));
};

window.fabric.TextCustom = TextNode;

export default TextNode;