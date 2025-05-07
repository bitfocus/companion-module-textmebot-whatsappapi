import type { ModuleInstance } from './main.js'
import { Regex } from '@companion-module/base'

export function UpdateActions(self: ModuleInstance): void {
	self.setActionDefinitions({
	
		sendTextMessage: {
			name: 'Send a Text Message',
			options: [
				{
					id: 'recipient',
					type: 'textinput',
					label: 'Recipient',
					default: '49123456789',
					tooltip: 'Format phonenumer without leading zeroes i.e. 49123456789 for Germany or 1123456789 for USA. If the recipient is a Group enter the GroupID.', 
					useVariables: true,
			
					
				},
				{
					id: 'message',
					type: 'textinput',
					label: 'Message',
					default: '',
					useVariables: true,
				},
			],
			callback: async (event) => {
				const o = event.options
			
				await self.apiGet(o.recipient as string, `text=${o.message}`)
			},
		},

		sendImageMessage: {
			name: 'Send a Text Message with Image',
			options: [
				{
					id: 'recipient',
					type: 'textinput',
					label: 'Recipient',
					default: '49123456789',
					tooltip: 'Format phonenumer without leading zeroes i.e. 49123456789 for Germany or 1123456789 for USA. If the recipient is a Group enter the GroupID.', 
					useVariables: true,
			
					
				},
				{
					id: 'image',
					type: 'textinput',
					label: 'File Url',
					default: '',
					useVariables: true,
					regex: Regex.SOMETHING
					
				},
				{
					id: 'message',
					type: 'textinput',
					label: 'Message',
					default: '',
					useVariables: true,
				},
			],
			callback: async (event) => {
				const o = event.options
			
				await self.apiGet(o.recipient as string, `text=${o.message}&file=${o.image}`)
			},
		},
		sendFileMessage: {
			name: 'Send a File',
			options: [
				{
					id: 'recipient',
					type: 'textinput',
					label: 'Recipient',
					default: '49123456789',
					tooltip: 'Format phonenumer without leading zeroes i.e. 49123456789 for Germany or 1123456789 for USA. If the recipient is a Group enter the GroupID.', 
					useVariables: true,
					
				},
				{
					id: 'file',
					type: 'textinput',
					label: 'File Url',
					default: '',
					useVariables: true,
					regex: Regex.SOMETHING
					
				}
				
			],
			callback: async (event) => {
				const o = event.options
			
				await self.apiGet(o.recipient as string, `text=${o.message}&document=${o.file}`)
			},
		},
	})
}
