<template>
	<List  border v-if="info">
	 <ListItem :key="i" v-for="(item,i) in info.items" @click="event(item)" >
		<a href="#"> {{item.name}}</a>
	 </ListItem>
	</List>
</template>

<script>
	import bus from '../../../../config/Event.js'	
	import {List} from 'view-design'
	import {mapState,mapMutations} from 'vuex'
	export default{
		components:{
			
		},
		props:{
			
		},
		data:()=>{
			return{
				visible:false,
			}
		},
		methods:{
		
		show(){
			this.visible=true
		},
		close(){
			this.visible=false
		},
		event(item){
		 //测试
		 bus.$emit(item.event)
		},
		},
		computed:{
			...mapState({
				'info':'secondMenu'
			})
		}
	}
</script>

<style scoped="scoped">
</style>


