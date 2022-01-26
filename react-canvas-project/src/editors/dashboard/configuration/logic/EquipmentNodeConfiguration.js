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
	dbList: {
		type: 'equipDBSelect',
		required: true,
		disabled: false,
		placeholder: 'Select DB',
		label: 'DB List'
	},
	dbTableList: {
		type: 'equipDBTableSelect',
		required: true,
		disabled: false,
		placeholder: 'Select DB Table',
		label: 'DB Table List'
	},
	
	showDelay: {
		type: 'equipNumberCustom',
		required: true,
		disabled: false,
		icon: '',
		label: 'showDelay',
		min: 1000,
		max: 60000,
		step: '100'
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
	},
	bStart: {
		type: 'boolean',
		disabled: true,
		hidden: true
	},
};
