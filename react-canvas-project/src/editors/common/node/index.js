import metadata from '../../../libs/fontawesome-5.2.0/metadata/icons.json';

import LogicNode from './logic/LogicNode';
import DataNode from './data/DataNode';
import TextNode from './data/TextNode';
import ChartNode from "./data/ChartNode";

import { getNode } from '../configuration/NodeConfiguration';

const defaultOption = {
	fill: 'rgba(0, 0, 0, 0.3)',
	stroke: 'rgba(255, 255, 255, 0)',
	borderColor: 'rgba(0, 0, 0, 1)',
	borderScaleFactor: 1.5,
	deletable: true,
	cloneable: true,
	action: {
		enabled: false,
	},
	tooltip: {
		enabled: true,
	},
	animation: {
		type: 'none',
	},
	userProperty: {},
	trigger: {
		enabled: false,
	},
};

const NODES = {
	LOGIC: {
		create: (option, descriptor) => {
			const node = getNode(descriptor.nodeClazz);
			const options = { ...defaultOption, descriptor, ...option};
			// switch (node) {
			// 	case 'FilterNode':
			// 		return new FilterNode(options);
			// 	case 'SwitchNode':
			// 		return new SwitchNode(options);
			// 	default:
			// 		return new LogicNode(options);
			// }
			return new LogicNode(options);
		},
	},
	DATA: {
		create: (option, descriptor) => {
			console.log("option");
			console.log(option);
			const node = getNode(descriptor.nodeClazz);
			if(node === 'BarNode'){
				return new DataNode(option);
			}
			if(node === 'TextNode'){
				return new TextNode(option);
			}
			if(node === 'ChartNode'){
				return new ChartNode(option);
			}
		},
	}
};

export default descriptors => Object.keys(descriptors).reduce((prev, key) => Object.assign(
	prev,
	descriptors[key].reduce((p, c) => Object.assign(p, {
		[getNode(c.nodeClazz)]: {
			create: option => {
				const iconMetadata = metadata[c.icon];
				const icon = iconMetadata
					? String.fromCodePoint(parseInt(iconMetadata.unicode, 16))
					: '\uf03e';
				return NODES[c.type].create({ ...option, icon }, c);
			},
		},
	}), {}),
), {});
