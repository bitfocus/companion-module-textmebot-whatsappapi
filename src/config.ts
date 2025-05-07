import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	apiKey: string
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'apiKey',
			label: 'API-Key',
			tooltip: 'Get the API-Key: https://textmebot.com/#lepopup-NewApiKey | Register your phone number | Scan the QR Code and link your phone',
			width: 8,
			regex: Regex.SOMETHING
		}
	]
}
