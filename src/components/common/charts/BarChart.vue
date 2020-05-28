<!-- 折线图 -->
<template>
 <div class="chart">
	 
 </div>
</template>

<script>
	
	export default{
		name:'BarChart',
		data:()=>{
			return{
				chart:null,
				option:null,
			}
		},
		methods:{
			init(obj){
	    // 基于准备好的dom，初始化echarts实例
		
		   this.chart = this.$echarts.init(this.$el)
		   this. option = {
			 title: {
			 	text:obj.title,
			 
			 	left: 'center'
			 },
			xAxis: {
				type: 'category',
				data: obj.xdata
			},
			yAxis: {
				type: 'value',
				minInterval: 1,
				axisLabel: {
				            formatter: '{value} '
				        },
					// boundaryGap : [ 0, 0.1 ],
			},
			series: [{
				data: obj.ydata,
				// grid:{
				//  x:30,
				//  y:20,
				//  x2:0,
				//  y2:30
				// },
				 grid: {left: '10%',bottom:'35%'},
				barWidth:20,
				type: 'bar',
				showBackground: true,
				backgroundStyle: {
					color: 'rgba(220, 220, 220, 0.8)'
				}
			}]
		};
		   
		   
		    this.chart.setOption(this.option)
		   },
		   setData(xdata,ydata){
			   if(xdata&&ydata&&xdata.length>0&&ydata.length>0){
				   this.option.xAxis.data=xdata
				   this.option.series[0].data=ydata
				   this.chart.setOption(this.option)
			   }
		   }
		}
	}
</script>

<style scoped="scoped">
	.chart{
		
		border: 1px solid lightgrey;
	}
</style>
