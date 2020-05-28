<template>
<div class="panel panel-default" v-show="visible">
	<div class="panel-heading">
		基站选址分析<span style="cursor: pointer;float: right;" @click="close">&times;</span>
	</div>
<div class="panel-body">
		<!-- 显示值 -->
		<form>
		<div class="form-group">
		 <input type="text"class="form-control" placeholder="天线辐射功率 (W)"  v-model="v1" >
		</div>
		  <div class="form-group">
		   <input type="text" class="form-control" placeholder="功率密度限值 (uW/cm2)" v-model="v2">
		  </div>
		  
		  <div class="form-group">
		   <input type="text"class="form-control" placeholder="天线辐射方向的功率增益 (dBi)"  v-model="v3" >
		  </div>
		  <div class="form-group">
		   <input type="text"class="form-control" placeholder="基站位置" disabled="disabled"  v-model="v4" >
		  </div>
	<a href="#" class="btn btn-default" title="位置模拟" @click="position"><i class="glyphicon glyphicon-map-marker"></i></a>
	<a href="#" class="btn btn-default" @click="confirm" title="确定"><i class="glyphicon glyphicon-ok"></i></a>
		  
		 </form>
</div>
</div>
</template>

<script>
import bus from '../../../config/Event.js'
import {fromLonLat} from 'ol/proj';
export default {
	name:'Forecast',
	data(){
		return{
			v1:2000,
			v2:0.8,
			v3:20,
			v4:'',
			v41:'',
			visible:false
		}
	},
	created() {
		bus.$on('showForecast',e=>{
			this.show()
		})
		bus.$on('receivePos',e=>{
			this.v4=this.trans3857To4326(e).map(e=>e.toFixed(2))
			this.v41=e
		})
	},
	methods:{
		confirm(){
			let {v1,v2,v3,v41}=this
			bus.$emit('forecast',{v1:v1,v2:v2,v3:v3,v4:v41})
		},
		position(){
			bus.$emit('setPos')
		},
		close(){
			this.visible=false
		},
		show(){
			this.visible=true
		},
		trans3857To4326(p){
				 return ol.proj.transform(p, 'EPSG:3857','EPSG:4326' );
		},
	}
}
</script>

<style>
</style>

