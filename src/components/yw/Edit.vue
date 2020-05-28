<template>
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import bus from '../../../config/Event.js'
	export default{
		name:'Edit',
		components:{
			
		},
		props:{
			
		},
		data:()=>{
			return{
				visible:false,
				fields:[]
			}
		},
		created() {
			bus.$on('editData',e=>{
				this.fields=e
			})
		},
		methods:{
			...mapMutations([
				'editDataItem'
			]),
			show(){
				this.visible=true
			},
			close(){
				this.visible=false
			},
			submit(){
				
			}
		},
		computed:{
			
		}
	}
</script>

<style scoped="scoped">
</style>
