import { fabric } from 'fabric';

import { NODE_COLORS } from '../../constant/constants';
import { BarComponent } from '../../../../canvas/objects';

const DataNode = fabric.util.createClass(BarComponent, {
	initialize(options) {
		options = options || {};
		options.fill = NODE_COLORS.DATA.fill;
		options.stroke = NODE_COLORS.DATA.border;
		this.callSuper('initialize', options);
	},
});

DataNode.fromObject = function(options, callback) {
	return callback(new DataNode(options));
};

window.fabric.BarNode = DataNode;

export default DataNode;
