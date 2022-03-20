import StyleProperty from './StyleProperty';
import TextProperty from './TextProperty';
import ShadowProperty from './ShadowProperty';


export default {
	TextNode: {
		text: {
			title: 'Text',
			component: TextProperty,
		},
		//link: {
		//	title: 'Link',
		//	component: LinkProperty,
		//},
		//tooltip: {
		//	title: 'Tooltip',
		//	component: TooltipProperty,
		//},
		style: {
			title: 'Style',
			component: StyleProperty,
		},
		shadow: {
			title: 'Shadow',
			component: ShadowProperty,
		},
		//animation: {
		//	title: 'Animation',
		//	component: AnimationProperty,
		//},
		//trigger: {
		//	title: 'Trigger',
		//	component: TriggerProperty,
		//},
		//userProperty: {
		//	title: 'User Property',
		//	component: UserProperty,
		//},
	}
};
