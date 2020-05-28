<template>
	 <div id="echarts" class="chart">
		 
	 </div>
</template>

<script>
	import 'echarts-liquidfill/src/liquidFill.js'; //在这里引入
	export default{
		
		components:{
			
		},
		props:{
			
		},
		data:()=>{
			return{
				visible:false,
				chart:null,
				option:null,
			}
		},
		methods:{
			init(data){
				  this.chart= this.$echarts.init(this.$el)
				     
				        
				       this.chart.setOption({
				          series: [{
				            type: 'liquidFill',
				            data: data,
				            itemStyle: {
				              shadowBlur: 0
				            },
							
				            outline: {
				              borderDistance: 0,
				              itemStyle: {
				                borderWidth: 3,
				                borderColor: '#156ACF',
				                shadowBlur: 20,
				              }
				            },
				            label: {
				              normal: {
				                textStyle: {
				                color: 'red',
				                insideColor: 'yellow',
				                fontSize: 40
				                }
				              }
				            },
				          }]
				        });
			},
			show(){
				this.visible=true
			},
			close(){
				this.visible=false
			}
		},
		computed:{
			
		}
	}
</script>

<style scoped="scoped">
	.chart{
		
		border: 1px solid lightgrey;
	}
</style>
