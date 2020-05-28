<template>
	<div class="panel panel-default">
	 <i-progress style='width: 270px;height: 15%;' :percent="value" :stroke-width="20" text-inside />
	 </div>
</template>

<script>
	import {Progress} from 'view-design';
	export default{
		name:'',
		data:()=>{
			return {
				value:0
			}
		},
	    methods:{
			setValue(v){
				this.value=v
			}
		}
	}
</script>

<style scoped>
	
</style>
