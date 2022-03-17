export default {
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
	bStart: {
		type: 'boolean',
		disabled: true,
		hidden: true
	},		
	ObjectName: {
		type: 'TextCustom',
		required: true,
		disabled: false,
		placeholder: '',
		label: 'Label',
		min: 1,
		max: 100,
	},
};
