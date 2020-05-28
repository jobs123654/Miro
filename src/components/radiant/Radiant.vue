<template>
	<div class="col-md-9" style="overflow-x:auto;height: 100%;width: 96%;">
		<div class="btn-group" style="margin-left: 80%;">
			<button class="btn btn-default"  @click="showAdd">新增</button>
			<button class="btn btn-default"  @click="showImport">导入</button>
			<button class="btn btn-default "  @click="moreDel">批量删除</button>
		</div>
		<table class="table" style="margin-right: 100px;">
			<thead>
				<tr  >
					<th>选择</th>
					<th style="width: auto;" v-for="i in fields">{{i}}</th>
					<th>操作</th>
				</tr>
				
			</thead>
		   <tbody>
			   <tr v-for="(u,i) in data">
			   <td><input type="checkbox" :value="u.ID" v-model="checks"/></span></td>
			   <td v-for="(k,v) in u" >
			  
			  <span >{{k}}</span>
			   </td>
				    <td class="btn-group" role="group">
						<button class="btn btn-sm" @click="showUpdate(u)"><i class="glyphicon glyphicon-pencil"></i></button>
						<button class="btn btn-sm" @click="del(u)"><i class="glyphicon glyphicon-trash"></i></button>
					</td>
			   </tr>
		   </tbody>
		</table>
		<!-- 分页组件 -->
		<Pager class='mPage' ref='page'  @show='show' />
		
	</div>
</template>

<script>
	import Pager from '../common/Pager.vue'
    import Import from '../common/Import'
	import VueDragResize from "vue-drag-resize";
	import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
	export default{
		name:'Radiant',
		components:{
			Pager,Import,VueDragResize
		},
		data(){
			return {
			 addVisible:false,
		     updateVisible:false,
			 	key:'rad',
			 fields:['时间(世界时)','强度','纬度(0.1N)','经度(0.1N)','中心最低气压(hPa)','近中心最大风速(MSW, ms-1)','2min平均风速(ms-1)','yid'],
			 formTemplate:{
				target:'radiant',
				title:'',
			    
				content:[]
			  },
			  checks:[],
			   data:[],
			   size:8
			}
		},
		mounted() {
		  this.loadPage()
		},
		methods:{
		...mapMutations([
			'setForm','delUser','setDataObj','setImport','delDataItem','setData',
		]),
		/* 分页输出 */
		loadPage(){
			
			if (this.list&&this.list.length>0) {
				 let n=this.list
				 if (this.size>=n.length) {
				 	this.size=n.length
				  }else{
					 this.size=8
				  }
				 this.data=n.slice(0,this.size)
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
		formatDate(numb, format) {
		       const time = new Date((numb - 1) * 24 * 3600000 + 1)
		       time.setYear(time.getFullYear() - 70)
		       const year = time.getFullYear() + ''
		       const month = time.getMonth() + 1 + ''
		       const date = time.getDate() - 1 + ''
		       if (format && format.length === 1) {
		         return year + format + month + format + date
		       }
		       return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
		     },
		showAdd(){
			this.formTemplate.title='新增记录'
			
			this.formTemplate.content=this.fields.map(e=>{
				return{
					name:e
				}
			})
			this.formTemplate.content.unshift({name:'年份'})
			this.setForm(this.formTemplate)
			
		},
		showImport(){
			this.setImport(true)
		},
		showUpdate(item){
			this.formTemplate.content=[]
			this.formTemplate.title='编辑'
			this.fields.forEach(e=>{
				if (e!=='yid') {
					this.formTemplate.content.push({
					name:e
				 })
				}
			})
			
			
			this.formTemplate.content.unshift({name:'年份'})
			this.setForm(this.formTemplate)
				setTimeout(e=>{
					item['年份']=item.yid
					delete item.yid
					this.setDataObj(item)
					
				},500)
		},
		 del(item){
		
			this.delDataItem(item)
		 },
		 moreDel(){
			 if(this.checks.length>0){
			
				 this.checks.forEach(e=>{
					 this.delDataItem({ID:e})
				 })
			 }
		  }
		 },
		computed:{
			list(){
				
				let d=this.$store.state.data;
				if(d&&d.length>0){
					d.forEach(e=>{
					 // e.投产时间=this.formatDate(e.投产时间)
					})
				
				}else{
					d=JSON.parse(localStorage.getItem(this.key));
					this.setData(d)
				}
				return d;
				
			}
		  
		},
		watch:{
			list:{
				handler(n,s){
					if(this.$refs.page){
                        this.loadPage()
					}
				}
			}
		}
	}
</script>

<style scoped>
	th{text-align: center;}
	.Page{position: fixed;top: 87%;left: 40%;}
	
</style>
