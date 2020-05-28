<template>
<div class="panel panel-default">
	<div class="panel-body">
	<form class="form-inline">
	  <div class="form-group">
		<input type="text" autofocus="autofocus" v-model="key" class="form-control" id="exampleInputEmail2" placeholder="搜索基站">
	  </div>
	  <button type="button" class="btn btn-default" @click="search"><i class="glyphicon glyphicon-search"></i></button>
	</form>
	<ul class="list-group"  style='margin-top: 2%;'>
		<!-- ios-radio-outline -->
	  <li class="list-group-item"  v-for="i in obj.items"> 
		  <a href="#" style='color: #2C3E50;' @click='search(i)' ><Checkbox v-model="i.checked"></Checkbox><Icon :type="i.icon"  size='24' color='#2C3E50' />{{i.name}}</span></a>&nbsp;&nbsp;&nbsp;<a href="#" style="float: right;" @click="setMainLayer(i)">
		  <Icon type="md-flag" :color='field===i.key?active:normal' title='设置操作图层' />
		  </a>
	  </li>
	 
	</ul>
	<!-- <Row>
		<Col span="1">
		 <span>&nbsp;</span>
		</Col>
		<Col span="11" >
			<Button @click='searchRadiant' :type='field==="rad"?active:normal' ></Button>
			
		</Col>
		<Col span="11" >
			<Button  @click='searchMeasure' :type='field==="mes"?active:normal'><Icon type="ios-pin" size='24'color='blue'/> 巡测点</Button>
			
		</Col>
		<Col span="1">
		 <input type="hidden">
		</Col>
	
	</Row> -->
	<Row style='margin-top: 2%;'>
		<Col span="6">
		 <span>&nbsp;</span>
		</Col>
		<Col span="6" >
			<a href="#" @click="circleQuery"><Icon color='#2C3E50' title='圆查询' type="ios-disc-outline" size='24'/></a>
		</Col>
		<Col span="6" >
			<a href="#" @click="polygonQuery"><Icon  color='#2C3E50'title='多边形查询' type="ios-map-outline" size='24'/></a>
		</Col>
		<Col span="6">
		 <input type="hidden">
		</Col>
	</Row>
	 
</div>
</div>
</template>

<script>
	import bus from '../../../config/Event.js'
		import { Row,Col,ColorPicker,InputNumber,Button } from 'view-design';
	export default{
		name:'Search',
		props:{
			obj:Object
		},
		data(){
			return{
				key:'',
				showMore:true,
				active:'red',
				normal:'grey',
				field:'rad'
			}
		},
		methods:{
			search(i){
				if(this.key!==''){
					bus.$emit('search',this.key)
				}else{
					 i.checked=!i.checked
					 bus.$emit('search',{type:i.key,icon:i.path,value:i.checked})
					
				}
			    
			},
			setMainLayer(i){
				this.field=i.key
				bus.$emit('setMainLayer',{type:i.key})
			},
			circleQuery(){
				 bus.$emit('geometryQuery',{type:'circle'})
			},
			polygonQuery(){
				 bus.$emit('geometryQuery',{type:'polygon'})
			},
			
			
		}
	}
</script>

<style>
</style>
