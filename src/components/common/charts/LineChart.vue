<!-- 折线图 -->
<template>
 <div class="chart" ref='chart'>
	 
 </div>
</template>

<script>

	export default{
		name:'LineChart',
		data:()=>{
			return{
				chart:null,
				option:null,
			}
		},
		methods:{
			init(xdata,ydata){
	    // 基于准备好的dom，初始化echarts实例
		  let x=xdata||[10, 20, 30, 400, 500,600],y=ydata||[0.7, 0.6, 0.5,0.26, 0.2, 0.1]
		  let max=(y.sort((a,b)=>b-a))[0]
		   this.chart = this.$echarts.init(this.$el)
		   this. option = {
			   xAxis: {
				   type: 'category',
				   data: x
			   },
			   yAxis: {
				   type: 'value',
				   min:0,
				   max:max
			   },
			   series: [{
				   data: y,
				   type: 'line'
			   }],
			   grid:{
				 x:30,
				 y:20,
				 x2:0,
				 y2:30
				},
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
