<template>
	<div class="panel panel-default">
	<!-- <div class="panel-heading">{{obj.title}}</div> -->
	<div class="panel-body">
	   <div class="checkbox" style="text-align: left;"  v-for="(i,j) in obj.items" >
	      <label>
	        <input type="checkbox" @change="check(i,j)" :checked="i.selected"/> {{i.title}}
	      </label>
	    </div>
	  </div>
	 </div>
</template>

<script>
	import bus from '../../../config/Event.js'
	export default{
		name:'MyTree',
		props:{
			obj:Object
		},
		data(){
			return{
			  fields:[
				  'show','clear'
			  ]
			}
		},
		methods:{
			check(item,index){
				if(!item.selected){
				//清除数据
				 item.selected=true
				 bus.$emit(this.fields[0], index);   
				 
				}else{
				 //展示数据
				 bus.$emit(this.fields[1], index);   
				 item.selected=false
				}
			}
		}
	}
</script>

<style>
</style>
