import axios from 'axios'
import config from './axios.config'

class Api {
	axios = axios.create(config)

	private request(axConfig: any) {
		return this.axios.request(axConfig)
	}

	public post(endpoint: string, data: any) {
		return fetch(`https://optimalblue.maceinnovation.com${endpoint}`, {
			method: 'post',
			// cache: 'no-cache',
			// credentials: 'include',
			// referrer: 'no-referrer',
			// mode: 'no-cors',
			body: JSON.stringify(data),
			headers: {
				'x-client-auth-key': 'momentumloans:kNUdeAETQ3VVrcny5MMMaaHGUbAxwu3AUspe5vt4f68D4Q2C'
			}
		});
		// const axConfig = {
		// 	method: 'post',
		// 	url: endpoint,
		// 	headers: { 'x-client-auth-key': 'momentumloans:kNUdeAETQ3VVrcny5MMMaaHGUbAxwu3AUspe5vt4f68D4Q2C' },
		// 	data
		// }
		// return this.request(axConfig)
	}
}

const api = new Api()
export default api
