<template>
<div class="panel panel-default" v-show="source.length>0">
	<div class="panel-heading">
		查询结果集<a href="#" @click="close" style="position: absolute;right: 2%;">&times;</a>
	</div>
	<div class="panel-body">
		<Table border :columns="column" :data="data"></Table>
		<Pager style='margin-top: 1%;' ref='page' @show='show'/>
	</div>
       
	</div>
	
</template>

<script>
	
	import {mapState,mapMutations} from 'vuex'
	import { Table } from 'view-design';
    import Pager from '../Pager'
	export default{
		name:'TablePanel',
	     data(){
			return{
				column:[],
				data:[],
				size:6,
				
			}
		},
		components:{
			Pager
		},
		
		computed:{
			...mapState({
				'source':'result',
			})
		},
		mounted() {
			if(this.$refs.page){
				if(this.size<this.source.length){
					this.data=this.source.slice(0,this.size)
				}else{
					this.data=this.source.slice(0,this.source.length)
				}
				this.column=this.getColumn(this.data)
				
				if(this.size>=this.source.length){
					this.size=this.source.length
				}
				let n=this.source
				let total=n.length%this.size>0?n.length/this.size+n.length%this.size:n.length/this.size;
				this.$refs.page.init(total,this.size)
			}
			
			
		},
		methods:{
			...mapMutations([
				'setResult'
			]),
			/* 分页输出 */
			show(e){
				let size=this.size,start=(e-1)*size;
				
				this.data=this.source.slice(start,start+size)
			},
			load(n){
				if(this.$refs.page){
					let total=0,size=6;
					if(size<n.length){
						this.data=n.slice(0,size)
						total=n.length%size>0?n.length/size+n.length%size:n.length/size;                 
					}else{
						this.data=n.slice(0,n.length)
						total=n.length
						this.size=n.length
					}
					this.column=this.getColumn(this.data)
					this.$refs.page.init(total,size)
				
				}
			},
			getColumn(data){
				let column=[]
				for(let i in data[0]){
				 column.push({
					 title:i.toUpperCase(),
					 key:i
				 });
				}
				return column
			},close(){
				this.setResult([])
			}
		},
		watch:{
			source:{
				handler(n,s){
					this.load(n)
				}
			}
		}
		
	}
</script>

<style>
</style>