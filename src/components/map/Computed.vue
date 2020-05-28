<template>
<div class="panel panel-default">
	<div class="panel-heading">
		单点实时预测值<span style="cursor: pointer;float: right;" @click="close">&times;</span>
	</div>
	<div class="panel-body">
		<LineChart ref='line' class='line'></LineChart>
		<span>y:历史监测值(w/m2)&nbsp;&nbsp;x:距离基站距离(m)</span>
		<!-- 显示值 -->
		<form>
		  <div class="form-group">
		   
		    <input type="text" class="form-control" placeholder="距离" v-model="distance">
		  </div>
		  <div class="form-group">
		   
		    <input type="text"class="form-control" placeholder="实时值"  v-model="value" >
		  </div>
		  
		   <a href="#" class="btn btn-default" @click="active"><i class="glyphicon glyphicon-hand-up"></i></a>
		  
		 </form>
	</div>
</div>
</template>

<script>
import bus from '../../../config/Event.js'
import LineChart from '../common/charts/LineChart'
export default{
	name:'Computed',
	components:{
		LineChart,
	},
	props:{
		obj:Object,
	},
	data:()=>{
		return{
			distance:'',
			value:'',
			jizhan:''
		}
	},
	created() {
		
		bus.$on('computed',e=>{
			if(this.$refs.line&&this.$refs.line.init)
			 this.$refs.line.init()
			 if (e&&e.d&&e.v) {
			 	this.distance=e.d
				this.value=e.v
			 }
		})
	},
    methods:{
	  close(){
		 bus.$emit('closeComputed')
	  },
	  active(){
		   bus.$emit('activeComputed')
		   
		  
	  }
	}
}
</script>

<style scoped="scoped">
	.line{
		width: 300px;
		height: 180px;
		/* width: 400px;
		height: 300px; */
	}
</style>
