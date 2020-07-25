<template>
  <div id="app" v-responsive="{ small: el => el.width < 720 }">
	<div id="container" ref='con'>
		

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
			<input type="number"
				   v-model:value="value"> <span>{{ baseCurrency }}</span>
		</div>

		<Cards v-responsive="{ small: el => el.width < 720 }"
			   :value="value"
			   :size="size"
		/>

	</div>
  </div>
</template>


<script>

import Cards from '@/components/Cards.vue';
import { ResponsiveDirective } from "vue-responsive-components";

export default {
	components : {
		Cards
	},
	directives: {
    	responsive: ResponsiveDirective
  	},
	data(){
		return{
			value : 1,
			activeCur : 0,
			end : 7,
			start: 0,
			size : 4
		}
	},
	computed: {
		baseCurrency(){
			return this.$store.getters.getBaseCurrency
		},
		getListOfRates(){
			return this.$store.getters.getListOfRates
		},
		getRates(){
			return this.$store.getters.getRates
		},

	},
	async mounted(){
		this.$store.dispatch("fetchData")

		window.onresize = ()=>{
			if (this.$refs.con.clientWidth<720){
				this.start = this.activeCur
				this.end = this.activeCur + 3
				this.size = 2
			}else {
				this.start = this.activeCur
				this.end = this.activeCur + 7
				this.size = 4
			}
		}
	},
	methods: {

		getNumber(i,cur){
			this.$store.dispatch('updateBase', cur)
			this.activeCur = this.getListOfRates.indexOf(cur)
		},

		next(){
			if(this.activeCur >=this.end-1 && this.activeCur < this.getListOfRates.length-1 && this.activeCur===this.end-1){
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
		},
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

	#app{
		#container{
			padding-bottom: 24px;
			margin: 0 auto;
			max-width: 720px;
			background: #fff;
		}
	}

	#app.small{
		#container{
			width: 320px;
		}
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
				width: 88px; 
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
				left: -5px;
				transform: rotate(-45deg);
			}
			.right{
				top: 50%;
				right: -5px;
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