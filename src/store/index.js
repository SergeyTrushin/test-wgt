import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		data : {},
		baseCurrency : '',
		active : 0
	},
	mutations: {
		updateData(state, data){
			state.data = data
		},
		updateBaseCurrency(state, base){
			state.baseCurrency = base
		},
	},
	actions: {
		async fetchData(ctx){
			const resp = await fetch('https://api.openrates.io/latest?base=' + this.state.baseCurrency)
			const data = await resp.json()
			await ctx.commit('updateBaseCurrency', data.base)
			await ctx.commit('updateData', data)
		},
		async updateBase(ctx,base){
			await ctx.commit('updateBaseCurrency',base)
			const resp = await fetch('https://api.openrates.io/latest?base=' + this.state.baseCurrency)
			const data = await resp.json()
			await ctx.commit('updateData', data)
		}
	},
	getters: {
		getListOfRates(state){
			let rates = []
			for (let rate in state.data.rates){
				rates.push(rate)
			}
			state.data.base === 'EUR' ? rates.splice(12 ,0, 'EUR') : null;
			return rates
		},
		getBaseCurrency(state){
			return state.baseCurrency
		},
		getRates(state){
			return state.data.rates
		},
		getNumberOfRates(state){
			let rates = []
			for (let rate in state.data.rates){
				rates.push(rate)
			}
			return rates.length
		},
		getActive(state){
			let rates = []
			for (let rate in state.data.rates){
				rates.push(rate)
			}
			return rates.indexOf(state.baseCurrency) === -1 ? 12 : rates.indexOf(state.baseCurrency) 
		}
	}
})