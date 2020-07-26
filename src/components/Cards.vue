<template>
	<div id='main'>
		<div class="items" ref='items'>
			
			<div v-if="!getRates" class="lds-dual-ring"></div>
			<div v-else class="item" v-for="curName of paginatedData">
				<p class="curName">{{ value ? value : 0 }}  <span>{{ baseCurrency }} = </span></p>
				<div class="curValue">
					<span class="valueOfCur">
						{{ calc(getRates[curName]).replace(/\./g,',') !== 'NaN' ? calc(getRates[curName]).replace(/\./g,',') : '0' }}
					</span> 

					<span class="curName">
						{{ curName }}
					</span>

				</div>
			
			</div> 
		</div>

		<div class="btn">
			<button class="back" @click='prevPage' :disabled="pageNumber== 0">Назад</button>
			<button class="next" @click='nextPage' :disabled="pageNumber >= pageCount -1">Далее</button>
		</div>
	</div>
</template>

<script>

const BigNumber = require('bignumber.js');

export default{
	props: [
		'value',
		'size'
	],
	computed: {
		getRates(){
			return this.$store.getters.getRates
		},
		getListOfRates(){
			return this.$store.getters.getListOfRates
		},
		baseCurrency(){
			return this.$store.getters.getBaseCurrency
		},
		baseSize(){
			return this.$store.getters.getNumberOfRates - 1
		},
		pageCount(){
      		let l = this.baseSize,
          	s = this.size;
      		return Math.ceil(l/s);
      		// return Math.floor(l/s);``
		},
		paginatedData(){
    		const start = this.pageNumber * this.size,
          		  end = start + this.size;
  			const index = this.getListOfRates.indexOf(this.baseCurrency)
  			const list = [...this.getListOfRates]
  			index !== -1 ? list.splice(index,1) : "";
    		return list.slice(start, end)
		},

},
	data(){
		return{
			pageNumber: 0,
		}
	},
	methods : {
	  nextPage(){
         this.pageNumber++;
      },
      prevPage(){
        this.pageNumber--;
      },
      calc(rate){
			return new BigNumber(rate).times(this.value).toFixed(2)
		}
	}
}

</script>


<style lang="scss">

	.items{
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
		.item{
			padding: 0 0 19px 23px;
			width: 46%;
			color: #2B2D33;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			margin: 0 24px 18px 0;
			box-shadow: 0px 3px 6px rgba(157, 157, 157, 0.16);
			border-radius: 12px;
			.curName{
				font-weight: normal;
				font-size: 18px;
				line-height: 21px;
				color: #2B2D33;
				span{
					font-weight: normal;
					font-size: 18px;
					line-height: 21px;
					color: #B9B9B9;
				}
			}
			.curValue{
				font-size: 48px;
				line-height: 56px;
				letter-spacing: 0.0342857px;
				font-weight: 300;
			}
		}
		.lds-dual-ring {
  			display: inline-block;
  			width: 80px;
  			height: 80px;
  			margin: 0 auto;
		}
		.lds-dual-ring:after {
  			content: " ";
  			display: block;
  			width: 64px;
  			height: 64px;
  			margin: 8px;
  			border-radius: 50%;
  			border: 6px solid #fff;
  			border-color: red transparent #fff transparent;
  			animation: lds-dual-ring 1.2s linear infinite;
		}
		@keyframes lds-dual-ring {
  			0% {
    			transform: rotate(0deg);
  			}
  			100% {
   				 transform: rotate(360deg);
  			}
		}

	}

	#main.small{
		.item{
			width: 85%;
			margin: 0 auto;
			margin-bottom: 18px;
		}
	}

	.btn{
		position: relative;
		margin-top: 41px;
		display: flex;
		justify-content: center;
		align-items: center;
		
		button{
			text-transform: uppercase;
			width: 112px;
			height: 39px;
			border: none;
			border-radius: 8px;
			margin-right: 19px;
			font-weight: 300;
			font-size: 14px;
			line-height: 16px;
			letter-spacing: 1px;
			color: #2B2D33;
			&:last-child{
				margin-right: 0;
			};
		}

		.back{
			background: #EFEFEF;
			color: #787878;
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
			&:before{
				content:'';
				display: inline-block;
				width: 8px;
				height: 8px;
				border: 1px solid #787878;
				border: none;
				border-bottom: 1px solid;
				border-left: 1px solid;
				transform: rotate(45deg);
				top: calc(50% - 4px);
				left: 0;
				margin-right: 11px;
			}
		}

		.next{
			background: #FFFFFF;
			box-shadow: 0 5px 10px rgba(157, 157, 157, 0.16);
			&:after{
				content:'';
				position: absolute;
				display: inline-block;
				width: 8px;
				height: 8px;
				border: 1px solid #282828;
				border: none;
				border-bottom: 1px solid;
				border-left: 1px solid;
				transform: rotate(-135deg);
				top: calc(50% - 4px);
				margin-left: 11px;
			}
		}
	}
</style>