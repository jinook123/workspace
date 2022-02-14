import i18n from 'i18next';

const NODE_COLORS = {
	LOGIC: {
		fill: '#AF7AC5',
		border: '#9B59B6',
	}
};

const OUT_PORT_TYPE = {
	EQUIP: 'EQUIP',
};

const DESCRIPTIONS = {
	script: i18n.t('common.name'),
	template: i18n.t('common.name'),
	json: i18n.t('common.name'),
	cron: i18n.t('common.name'),
};

export { NODE_COLORS, OUT_PORT_TYPE, DESCRIPTIONS };
