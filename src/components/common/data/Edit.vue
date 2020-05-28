<template>
	<div class="panel panel-default" style="background-color: #FFFFFF;">
		<div class="panel-heading">
			编辑记录<span style="cursor: pointer;float: right;" @click="close">&times;</span>
		</div>
		<div class="panel-body">
			<span  v-for="(i,index) in  fields">
			 <Input v-if='i.type==="text"'  :key='index' v-model='i.value' :name='i.name' :placeholder="i.title" style="width: 300px;margin-top: 2%;"/>	
			</span>
			<button class="btn" @click="ok">确定</button>
			<button class="btn"  @click="close">关闭</button>
		</div>
</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import {Input} from 'view-design'
	import bus from '../../../../config/Event.js'
	export default{
		name:'Add',
		components:{
			
		},
		props:{
			
		},
		data:()=>{
			return{
			
				fields:[],
				key:'',
			}
		},
		
		methods:{
			...mapMutations([
				'editDataItem','setKey'
			]),
			ok(){
				let item={}
				this.fields.forEach(e=>{
					if(e.value!==''){
						item[e.title]=e.value
					}
				})
				this.setKey(this.key)
				this.editDataItem(item)
				this.$emit('close')
			},
			
			show(e){
				
				this.fields=e.fields
				this.key=e.name
			},
			close(){
				
				this.fields.forEach(e=>{
					if(e.value!==''){
						e.value=''
					}
				})
				this.$emit('close')
			},
			
		},
		computed:{
			
		}
	}
</script>

<style scoped="scoped">
</style>
