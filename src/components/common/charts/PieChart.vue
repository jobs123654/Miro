<template>
	<div id="piechart" ref='chart'>
		 
	</div>
</template>

<script>
	export default{
		name:'',
		components:{
			
		},
		props:{
			
		},
		mounted() {
			
		},
		data:()=>{
			return{
				visible:false,
				chart:null,
				option:null,
			}
		},
		methods:{
		init(obj){
		
		
		  this.chart = this.$echarts.init(this.$el)
		this.option = {
			title: {
				text:obj.name,
			
				left: 'center'
			},
			
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
			legend: {
				show:false
			},
			series: [
				{
					name: obj.name,
					type: 'pie',
					radius: '50%',
					center: ['45%', '50%'],
					data: obj.data,
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},
					label: {
					          normal: {
					                    show: true,
					                   position: 'inner',
					                  formatter:"{b}:{d}%"
					           },
							  labelLine: {
							              normal: {
							                  show: false
							              }
							   }
					   },
				}
			]
		};
		  this.chart.setOption(this.option)
		},
		show(){
			this.visible=true
		},
		close(){
			this.visible=false
		},
		
		},
		computed:{
			
		}
	}
</script>

<style scoped="scoped">
	.piechart{
		
		border: 1px solid lightgrey;
	}
</style>
