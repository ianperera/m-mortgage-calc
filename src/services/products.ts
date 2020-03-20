import Api from './api'

export const getConformingProducts = (criteria: any) => {
	return new Promise((resolve, reject) => {
		Api.post('/rates-bestexsearch-ml', criteria)
			.then(res => res.json())
			.then(res => resolve(res.products))
			.catch(err => reject(err))
	})
};

export const getNonConformingProducts = async (criteria: any) => {
	return new Promise((resolve, reject) => {
		Api.post('/rates-bestexsearch-ml/nonconforming', criteria)
			.then(res => res.json())
			.then(res => resolve(res.products))
			.catch(err => reject(err))
	})
};

export const getFHAProducts = async (criteria: any) => {
	return new Promise((resolve, reject) => {
		Api.post('/rates-bestexsearch-ml/fha', criteria)
			.then(res => res.json())
			.then(res => resolve(res.products))
			.catch(err => reject(err))
	})
};

export const getVeteranProducts = async (criteria: any) => {
	return new Promise((resolve, reject) => {
		Api.post('/rates-bestexsearch-ml/va', criteria)
			.then(res => res.json())
			.then(res => resolve(res.products))
			.catch(err => reject(err))
	})
};