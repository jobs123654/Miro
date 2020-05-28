<template>

	   <!-- Single button -->
	   <div>
	     <a class="dropdown-toggle" style="text-decoration: none;color: lightslategrey;" href="#"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	        {{obj.title}}<span class="caret"></span>
	     </a>
	     <ul class="dropdown-menu" style="text-align: center;">
	       <li :key='j'  v-for='(i,j) in obj.items' @click='click(i)'>
		    <Checkbox v-show='i.show' style='margin-left: 10%;' v-model="i.checked">{{i.name}}</Checkbox>
	      </li>
	     </ul>
	  </div>

 
</template>

<script>
	import bus from '../../../../config/Event.js'
	import {Icon,Checkbox} from 'view-design';
	export default{
		name:'DropDownMenu',
		props:{
			obj:Object,
		},
		data:()=>{
			return {
			   key:'oper'	
			}
		},
		methods:{
		  click(item){
			  item.checked=!item.checked
			  bus.$emit(this.key,{key:item.event,value:item.checked})
			
		  }	
		}
	}
</script>

<style scoped="scoped">
	a{text-decoration: none;color: red;}
</style>
