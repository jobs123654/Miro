<template>
	
</template>

<script>
	export default{
		name:'DrawT',
		props:{
			
		},
		data:()=>{
			return{
				visible:false,
			}
		},
		methods:{
			...mapMutations([
				'setForm','setDataObj','setImport','delDataItem','setData',
			]),
			
			/* 分页输出 */
			loadPage(){
				if (this.list.length>0) {
					 let n=this.list
					 this.data=n.slice(0,8)
					 let total=n.length%this.size>0?n.length/this.size+n.length%this.size:n.length/this.size;
				    this.$refs.page.init(n.length,this.size)
				}
			},
			show(e){
				let start=(e-1)*this.size,end=start+this.size;
				if(end>=this.list.length){
					end=this.list.length
				}
				this.data=this.list.slice(start,end)
			},
			show(){
				this.visible=true
			},
			close(){
				this.visible=false
			}
		},
		computed:{
			
		}
	}
</script>

<style scoped="scoped">
</style>
