<template>
	<div>
		<span>{{info}}</span><span><a href="#" @click="close">&times;</a></span>
	</div>
</template>

<script>
	export default{
		name:'Tooltip',
		data:()=>{
			return{
			 visible:false	
			}
		},
		methods:{
			click(){
				this.close()
			},
			show(){
				this.visible=true
			},
			close(){
				this.visible=false
			}
		}
	}
</script>

<style scoped="scoped">
	
</style>
