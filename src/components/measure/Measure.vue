<template>
	<div class="col-md-9" style="overflow-x:auto;height: 100%;width: 96%;">
		<div class="btn-group" style="margin-left: 85%;">
			<button class="btn btn-default"  @click="showAdd">导入</button>
			<button class="btn btn-default "  @click="moreDel">批量删除</button>
		</div>
		<table class="table table-bordered" style="margin-right: 100px;">
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
			  
			  <span>{{k}}</span>
			   </td>
				    <td class="btn-group" role="group">
						<!-- <button class="btn btn-sm" @click="showUpdate(u)"><i class="glyphicon glyphicon-pencil"></i></button> -->
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
		name:'Measure',
		components:{
			Pager,Import,VueDragResize
		},

		data(){
			return {
			 addVisible:false,
		     updateVisible:false,
			 key:'mes',
			 fields:['ID','站点ID','监测时间','监测值','温度','单位','湿度','监测类型','电池电量','频率','经度','纬度'],
			 formTemplate:{
				target:'user',
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
		created() {
			// localStorage.removeItem('mes')
		},
		methods:{
		...mapMutations([
			'setForm','delUser','setDataObj','setImport','delDataItem1','setData1',
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
		  this.setImport(true)
		},
		showUpdate(item){
			this.formTemplate.title='编辑信息'
			this.formTemplate.content=this.fields.map(e=>{
				return{
					name:e
				}
			})
		
			this.setForm(this.formTemplate)
				setTimeout(e=>{
					this.setDataObj(item)
				},1000)
		},
		 del(item){
			
			this.delDataItem1(item)
		 },
		 moreDel(){
			 if(this.checks.length>0){
				
				 this.checks.forEach(e=>{
					 this.delDataItem1({ID:e})
				 })
			 }
		  }
		 },
		computed:{
			list(){
				let d=this.$store.state.data1
				if(d&&d.length>0){
					d.forEach(e=>{
						e.监测时间=this.formatDate(e.监测时间)
					})
				}else{
					d=JSON.parse(localStorage.getItem(this.key));
					this.setData1(d)
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
	.mPage{position: absolute;top: 77%;left: 44%; }
	.Import{
		position: absolute;
		width: 300px;
		left: 40%;
		top: 30%;
	}
</style>
