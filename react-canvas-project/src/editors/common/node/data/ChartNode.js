import { fabric } from 'fabric';

import { NODE_COLORS } from '../../constant/constants';
import { Chart } from '../../../../canvas/objects';

const ChartNode = fabric.util.createClass(Chart, {
	initialize(options) {
		options = options || {};
		options.fill = NODE_COLORS.DATA.fill;
		options.stroke = NODE_COLORS.DATA.border;
		this.callSuper('initialize', options);
	},
});

ChartNode.fromObject = function(options, callback) {
	return callback(new ChartNode(options));
};

window.fabric.Chart = ChartNode;

export default ChartNode;
