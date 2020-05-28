<template>
 <div class="panel panel-default">
     <div class="panel-body">
		 <table>
		 
		     <tr v-for="item in obj.items">
		 		<td>	<ColorPicker diabled  v-model="item.value" /></td><td>&nbsp;&nbsp;&nbsp;</td><td>{{item.name}}</td>
		 	</tr>
		 </table>
     </div>
	 </div>
	
   
</template>

<script>
	import { Row,Col,ColorPicker,InputNumber,Button } from 'view-design';
	export default{
		name:'Compass',
		props:{
			obj:Object
		},
		data:()=>{
			return{
				
			}
		}
	}
</script>

<style scoped>
	table{background-color: #fff;}
</style>
