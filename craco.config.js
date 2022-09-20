const CracoLessPlugin = require('craco-less')

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							'@font-family': 'Roboto-Medium, sans-serif',
							'@primary-color': '#568159',
							'@card-padding-base': '10px',
							'@card-radius': '2px',
							'@card-head-padding': '24px',
							'@layout-header-background': '#FFFFFF',
							'@page-header-back-color': '#FFFFFF',
							'@page-header-ghost-bg': '#FFFFFF',
							'@typography-title-margin-top': '0px',
							'@typography-title-margin-bottom': '0px',
							'@typography-title-font-weight': '500',
							'@menu-dark-selected-item-text-color': '#FFFFFF',
							'@menu-item-active-bg': '#F5F5F5',
							'@success-color': '#568159',
							'@border-radius-base': '4px',
							'@btn-height-base': '40px',
							'@input-height-base': '40px',
							'@btn-padding-horizontal-base': '16px',
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
}
