import { InstanceBase, runEntrypoint, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig } from './config.js'
import { UpdateVariableDefinitions } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'

import fetch from 'node-fetch'

export class ModuleInstance extends InstanceBase<ModuleConfig> {
	variableUpdateEnabled: boolean = false

	config!: ModuleConfig // Setup in init()

	constructor(internal: unknown) {
		super(internal)
	}

	async init(config: ModuleConfig): Promise<void> {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions

		
	}
	// When module gets deleted
	async destroy(): Promise<void> {
		this.variableUpdateEnabled = false
		this.log('debug', 'destroy')
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		this.config = config
	}

	// Return config fields for web config
	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	updateActions(): void {
		UpdateActions(this)
	}

	updateFeedbacks(): void {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions(): void {
		UpdateVariableDefinitions(this)
	}




	async apiGet(recipient: string, apimethod: string): Promise<string | null> {
		this.log('debug', `Send GET request to ${apimethod}`)
	
		const url = `https://api.textmebot.com/send.php?recipient=${recipient}&apikey=${this.config.apiKey}&${apimethod}`
		this.log('debug', `API Url: ${url}` )
		try {
			const response = await fetch(url)
			const text = await response.text()
			return text
		} catch (error) {
			this.log('error', `GET ${apimethod} failed: ${error}`)
			return null
		}
	}
	

	


	
}

runEntrypoint(ModuleInstance, UpgradeScripts)
