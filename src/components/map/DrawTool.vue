<template>
<div class="panel panel-default">
	<div class="panel-heading">{{obj.title}}</div>
	<div class="panel-body">
		<div  style="width: auto;">
			     <button type="button" :title="item.name" v-show='item.show' style="margin-right: 1%;" v-for="item in obj.items"  @click="event(item)" class="btn">
				 <span v-show="obj.showIcon" :class="item.icon"></span>
				 
		</button> 
		</div>
		<Row >
			<Col span="1">
			 <span>&nbsp;</span>
			</Col>
			
			<Col span="11">
				边框色
				<ColorPicker v-model="style.stroke" />
			</Col>
			<Col span="11" >
				填充色
				<ColorPicker v-model="style.fill" />
			</Col>
			<Col span="1">
			 <input type="hidden">
			</Col>
		
      </Row>
	  <Row>
			<Col span="1">
			 <span>&nbsp;</span>
			</Col>
			<Col span="11">
				线宽&nbsp;&nbsp;
				<InputNumber style='width: 50%;' :max="10" :min="1" v-model="style.width"></InputNumber>
				
			</Col>
			<Col span="11">
			  <input type="hidden">
			</Col>
			<Col span="1">
			 <input type="hidden">
			</Col>
	  		
	  </Row>
		
	</div>
	
	</div>
 
</template>

<script>
	import bus from '../../../config/Event.js'
	import { Row,Col,ColorPicker,InputNumber } from 'view-design';
	export default{
		name:'DrawTool',
		props:{
			
		},
		data:()=>{
			return {
		obj:{
		title:'标绘',
		showIcon:true,
		 freehand: true,
		items:[
		 {
			name:'点',type:'Point',show:true, icon:'glyphicon glyphicon-asterisk'
		 },
		 {
		   name:'线',type:'LineString',show:true, icon:'glyphicon glyphicon-italic'
		 },
		 {
		  name:'矩形',type:'Polygon',show:true, icon:'glyphicon glyphicon-stop'
		 },
		 {
		  name:'多边形',type:'Circle',show:true, icon:'glyphicon glyphicon-record'
		 },
		]
	},
		style:{
			fill:'#19be6b',
			stroke:'rgba(255, 155, 25, 1)',
			width:2
		}
	}
		},
		methods:{
			event(item){
				bus.$emit('draw',{type:item.type,style:this.style})
				
			}
		},
		watch:{
			style: {
			    handler(n, o) {
			      bus.$emit('setDrawStyle',n)
			    },
				immediate: true,
				deep: true
			  },
			
		}
	}
</script>

<style>
</style>
