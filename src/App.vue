<template>
  <div id="app">
    
	<div id="container">
		

		<div id="core-toolbar">
			<p class="rate">Курс {{ baseCurrency }} сегодня</p>

			<nav class="tabs">
					<button class="left" 
							v-if="activeCur!==0" 
							@click="previous">
					</button>

					<button class="tab" 
							v-for="(cur,i) of getListOfRates.slice(start,end)" :key="i"
							v-bind:class="{ active : isActive(cur) }"
							@click="getNumber(i,cur)">
							
							{{ cur }}
					
					</button>

					<button class="right" 
							v-if="activeCur !== getListOfRates.length-1" 
							@click="next">
					</button>
			</nav>

		</div>
		
		<div class="input">
			<input type="text" v-model:value="value"> <span>{{ baseCurrency }}</span>
		</div>

		<Cards
			   :value="value"
		/>

	</div>

  </div>
</template>


<script>

import Cards from '@/components/Cards.vue';



export default {
	components : {
		Cards
	},

	data(){
		return{
			value : 1,
			activeCur : 0,
			end : 7,
			start: 0,
			howManyShow : 7,
		}
	},
	computed: {
		baseCurrency(){
			return this.$store.getters.getBaseCurrency
		},
		getListOfRates(){
			const rates = [...this.$store.getters.getListOfRates]
			return rates
		},
		getRates(){
			return this.$store.getters.getRates
		},
		getActiveNumber(name){
			this.$store.getters.activeNumber
		}
	},
	async mounted(){
		this.$store.dispatch("fetchData")
	},
	methods: {

		getNumber(i,cur){
			this.$store.dispatch('updateBase', cur)
			this.activeCur = this.getListOfRates.indexOf(cur)
		},

		next(){
			if(this.activeCur >=this.howManyShow-1 && this.activeCur < this.getListOfRates.length-1 && this.activeCur===this.end-1){
				this.start++;
				this.end++;
			}

			if(this.activeCur < this.getListOfRates.length-1){
				this.activeCur++;
				this.$store.dispatch('updateBase', this.getListOfRates[this.activeCur])
			}
		},

		previous(){
			if(this.activeCur !== 0 && this.getListOfRates[this.activeCur] == this.getListOfRates.slice(this.start, this.end)[0] ){
				this.start--;
				this.end--;
			}

			if(this.activeCur !== 0){
				this.activeCur--;
				this.$store.dispatch('updateBase', this.getListOfRates[this.activeCur])
			}
		},
		isActive(cur){
			return cur === this.getListOfRates[this.activeCur]
		}
	}
}
</script>

<style lang="scss">

	$navColor : #FFE782;

	@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

	body{
		font-family: 'Roboto', sans-serif;
	}
	
	*{
		box-sizing: border-box;
	}

	button{
		&:active{
				outline : none;
		}
		&:focus{
				outline: none;
		}
	}

	#container{
		margin: 0 auto;
		width: 720px;
	}

	#core-toolbar{
		background: $navColor;
		padding: 1rem 1.5rem 0 1.5rem;
			
		.rate{
			font-weight: normal;
			font-size: 21px;
			line-height: 25px;
		}

		.tabs{
			display: flex;
			justify-content: center;
			position: relative;
			.tab{
				position: relative;
				top: 5px;
				padding: 0;
				width: 90px; 
				height: 48px;
				font-weight: 500;
				font-size: 14px;
				line-height: 16px;
				text-align: center;
				background: none;
				border: none;
				color: #CCAE68;
			}
			.left,.right{
				color: #CCAE68;
				padding: 0;
				margin: 0;
				position: absolute;
				content: "a";
				width: 8px;
				height: 8px;
				background: none;
				border: none;
				border-top: 1px solid;
				border-left: 1px solid;
			}

			.left{
				top:50%;
				left: 0;
				transform: rotate(-45deg);
			}
			.right{
				top: 50%;
				right: 0;
				transform: rotate(135deg);
			}
			.active{
				background: #fff;
				border-radius: 5px;
				color: #000;
				font-weight: bold;
			}
		}
	}

	.input{
		padding: 1rem;
		margin-top: 15px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		input{
			border: none;
			border-bottom: 1px solid #D9D9D9;
			padding: 0.5rem;
			width: 158px;
			outline: none;
			text-align: end;
			margin-right: .5rem;
			font-weight: normal;
			font-size: 18px;
			line-height: 21px;
			color: #2B2D33;
		}

		span{
			font-weight: normal;
			font-size: 18px;
			line-height: 21px;
			color: #B9B9B9;
		}
	}
	
</style>