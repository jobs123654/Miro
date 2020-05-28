<template>
 <div class="panel panel-default" v-if="obj">
	 <div class="panel-heading">
		 <h6 style="float: left;">图例 
     <small>单位:元</small>
		 </h6><a href="#" @click="close" style="position: absolute;right: 2%;top: -0.7%;">&times;</a>
	 </div>
     <div class="panel-body">
		 
		 <table>
		    <tr v-for="(item,key) in obj.items" :key='key'>
		 		<td><span class="color" :style="{backgroundColor:item.value}">&nbsp;&nbsp;</span></td><td>&nbsp;&nbsp;&nbsp;</td><td>{{item.name}}</td>
		 	</tr>
		 </table>
     </div>
	 </div>
	
   
</template>

<script>
	import { Row,Col,ColorPicker,InputNumber,Button } from 'view-design';
	export default{
	    props:{
	    	obj:Object
	    },
		data:()=>{
			return{
				
			}
		},
		methods:{
			show(items){
				
			},
			close(){
				
			}
		}
	}
</script>

<style scoped>
	.color{
		width: 40px;
		height: 40px;
	}
	table{background-color: #fff;}
</style>
