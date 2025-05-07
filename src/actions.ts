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
					tooltip: `⏎↹↹↹↹↹↹"Format·phonenumer·without·leading·zeroes·i.e.·49123456789·for·Germany·or·1123456789·for·USA·or·with·leading·'+'·(+49123456789).·If·the·recipient·is·a·Group·enter·the·Group-ID·Variable·(Use·the·Convert·Group_Info·to·Group_ID·function·first!)."`,
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
				const recipient = await self.parseVariablesInString(o.recipient as string)
				const message = await self.parseVariablesInString(o.message as string)
				await self.apiGet(recipient, `text=${message}`)
			}
		},

		sendImageMessage: {
			name: 'Send a Text Message with Attachement',
			options: [
				{
					id: 'recipient',
					type: 'textinput',
					label: 'Recipient',
					default: '49123456789',
					tooltip: `⏎↹↹↹↹↹↹"Format·phonenumer·without·leading·zeroes·i.e.·49123456789·for·Germany·or·1123456789·for·USA·or·with·leading·'+'·(+49123456789).·If·the·recipient·is·a·Group·enter·the·Group-ID·Variable·(Use·the·Convert·Group_Info·to·Group_ID·function·first!)."`,
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
					id: 'fileType',
					type: 'dropdown',
					label: 'FileType',
					default: 'file',
					choices: [
						{ id: 'file', label: 'Image/Video' },
						{ id: 'document', label: 'Document' },
					],
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
				const recipient = await self.parseVariablesInString(o.recipient as string)
				const message = await self.parseVariablesInString(o.message as string)
				const image = await self.parseVariablesInString(o.image as string)
				await self.apiGet(recipient , `text=${message}&${o.fileType}=${image}`)
			},
		},
		sendFileMessage: {
			name: 'Send Audio',
			options: [
				{
					id: 'recipient',
					type: 'textinput',
					label: 'Recipient',
					default: '49123456789',
					tooltip: `⏎↹↹↹↹↹↹"Format·phonenumer·without·leading·zeroes·i.e.·49123456789·for·Germany·or·1123456789·for·USA·or·with·leading·'+'·(+49123456789).·If·the·recipient·is·a·Group·enter·the·Group-ID·Variable·(Use·the·Convert·Group_Info·to·Group_ID·function·first!)."`,
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
				const recipient = await self.parseVariablesInString(o.recipient as string)
				const file = await self.parseVariablesInString(o.file as string)
				await self.apiGet(recipient, `&audio=${file}`)
			},
		},

		getGroupIDFromGroupInfo: {
			name: 'Convert Group_Info to Group_ID',
			options: [
				{
					id: 'group_info',
					type: 'textinput',
					label: 'Group_Info',
					tooltip: `⏎↹↹↹↹↹↹'The·group·info·is·extracted·out·of·the·invite·link·of·a·group.·The·Invite-Link·looks·like·https://chat.whatsapp.com/xyz·where·xyz·is·the·group_info·to·be·used'`, 
					default: 'XYABCDEFG',
					useVariables: true,
			
					
				}		
				
			],
			callback: async (event) => {
				const o = event.options

				//const varName = o.target_variable as string
			
				// Fetch the group ID using the provided group_info
				const groupInfo = await self.apiGetGroupId(o.group_info as string)
				const varName = groupInfo.subject as string
				if (groupInfo && groupInfo.group_id) {
					// Initialize tracking array if not present
					if (!self.dynamicVariables) {
						self.dynamicVariables = []
					}
			
					// Check if variable is already registered
					if (!self.dynamicVariables.includes(varName)) {
						self.setVariableDefinitions([
						{ variableId: varName, name: `Custom Variable: ${varName}` },
						])
						self.dynamicVariables.push(varName)
						self.log('debug', `Registered new Companion variable: ${varName}`)
					}
			
					// Set the value of the variable
					self.setVariableValues({
						[varName]: String(groupInfo.group_id),
					})
					self.log('debug', `Set variable "${varName}" to: ${groupInfo.group_id}`)
				} else {
					self.log('error', `Group ID could not be retrieved from provided group info.`)
				}
			}
			,
		}
	})
}
