<template>
	<div>


		<div class="items">

			<div class="item" v-for="curName of paginatedData">
				<p class="curName">{{ value }}  <span>{{ baseCurrency }} = </span></p>
				<div class="curValue">
					<span class="valueOfCur">
						{{  (getRates[curName] * value).toFixed(2) }}
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
	
export default{
	props: [
		'value',
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
		}
},
	data(){
		return{
			pageNumber: 0,
			size: 4, 
		}
	},
	methods : {
	  nextPage(){
         this.pageNumber++;
      },
      prevPage(){
        this.pageNumber--;
      }
	}
}

</script>


<style lang="scss" scoped>
	.items{
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
		.item{
			width: 46%;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			margin-left: 24px;
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
			}
		}
	}

	.btn{
		margin-top: 41px;
		display: flex;
		justify-content: center;
		align-items: center;
		
		button{
			text-transform: uppercase;
			width: 112px;
			height: 34px;
			border: none;
			border-radius: 8px;
			margin-right: 19px;
			&:last-child{
				margin-right: 0;
			};
		}

		.back{
			background: #EFEFEF;
			box-shadow: 0 5px 6px rgba(157, 157, 157, 0.16);
		}

		.next{
			background: #FFFFFF;
			box-shadow: 0 5px 10px rgba(157, 157, 157, 0.16);
		}
	}
</style>