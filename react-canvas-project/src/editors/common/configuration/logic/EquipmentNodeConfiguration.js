export default {
	equipmentId: {
		type: 'equipTextCustom',
		required: true,
		disabled: false,
		placeholder: 'Equipment ID',
		label: 'Equipment ID',
		min: 1,
		max: 100,
	},
	equipmentName: {
		type: 'equipTextCustom',
		required: true,
		disabled: false,
		placeholder: 'Equipment Name',
		label: 'Equipment Name',
		min: 1,
		max: 100,
	},
	outputCount: {
		type: 'number',
		icon: '',
		label: 'OutputCount',
		disabled: true,
		span: 24,
		min: 0,
		max: 10,
		hidden: true
	}
};
