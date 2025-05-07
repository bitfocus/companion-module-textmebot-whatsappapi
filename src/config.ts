import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	apiKey: string
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'static-text',
			id: 'configStaticText',
			label: 'Important',
			value: `Get the API-Key: <a href="https://textmebot.com/#lepopup-NewApiKey" target="_blank">https://textmebot.com/#lepopup-NewApiKey</a> | Register your phone number | Scan the QR Code and link your phone`,
			width: 8,
		},
		{
			type: 'textinput',
			id: 'apiKey',
			label: 'API-Key',
			width: 8,
			regex: Regex.SOMETHING,
		},
	]
}
