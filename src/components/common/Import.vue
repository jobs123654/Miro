<template>
  <div class="panel panel-default" v-show="importVisible">
     <div class="panel-heading text-primary">数据导入</div>
	 <div class="panel-body">
		 <form class="form" name="myform">
			 <input type="file" id="imports" class="form-control" required="required"><br />
			 <span>格式要求：.txt/csv/xlsx</span>
		 </form>
		 <div class="btn-group" style="margin-top: 1.5%;">
			 <button type="button" class="btn btn-default" @click="imports" onclick='return false'>导入</button>
			 <button type="button" class="btn btn-default" @click="cancel">取消</button>
		 </div>
	 </div>
	</div>
</template>

<script>
	
	import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
	
	// import XLSX from 'xlsx'
	export default{
		name:'Import',
		data(){
			return{
				target:null
			}
		},
		
		mounted() {
		 
			 // $('#import').change((e)=>{
			 // 	
			 // })		
			
			document.getElementById('imports').onchange=e=>{
				this.target=e.target
			}
		  
		},
		methods:{
			...mapMutations([
				'setImport','setData','setData1','pushData','pushData1'
			]),
			imports(){
				var files = this.target.files;
				var fileReader = new FileReader();
				var excle = $('#imports').val();
				fileReader.readAsBinaryString(files[0]);
				if(excle == null) {
					alert("未选择Excel文件");
				} else {
					// 判断是否是Excel格式
					if(excle != '') {
						//文件名可以带空格
						var reg = /^.*\.(?:xls|csv|xlsx)$/i;
						//校验不通过
						
						if(!reg.test(excle)) {
							/* 读取文本文件 */
							// alert("请上传excel格式的文件!");
							fileReader.onload = (ev)=> {
								try {
									//console.log(ev.target.result)
									let list=[]
									var data = ev.target.result,
									data=data.split('\n');
									data.forEach(e=>{
										if(e.length<60){
											// 1949061200 0  66 1450 1008       0
											let r=e.match(/\d+/g);
											let item={},yid=excle.match(/\d+/g)
											if(r&&r.length>0){
												item={
													'时间(世界时)':r[0],
													'强度':r[1],
													'纬度(0.1N)':(parseInt(r[2])*0.1).toFixed(2),
													'经度(0.1N)':(parseInt(r[3])*0.1).toFixed(2),
													'中心最低气压(hPa)':r[4],
													'近中心最大风速(MSW, ms-1)':r[5],
													'2min平均风速(ms-1)':Math.round(Math.random()*40+20),
													'yid':yid[0],
												};
												list.push(item)
											}
											
											 
										}
									})
									 this.setData(list)	
									
								} catch(e) {
									
									console.log(e)
									return;
								}
							}
						
						} else {
							
							fileReader.onload = (ev)=> {
								try {
									//console.log(ev.target.result)
									var data = ev.target.result,
										workbook = this.XLSX.read(data, {
											type: 'binary'
										}), // 以二进制流方式读取得到整份excel表格对象
										persons = []; // 存储获取到的数据
								} catch(e) {
									alert('文件类型不正确');
									console.log(e)
									return;
								}
								
								// 表格的表格范围，可用于判断表头是否数量是否正确
								var fromTo = '';
								// 遍历每张表读取
								for(var sheet in workbook.Sheets) {
									if(workbook.Sheets.hasOwnProperty(sheet)) {
										fromTo = workbook.Sheets[sheet]['!ref'];
										persons = persons.concat(this.XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
									}
								}
								if(persons.length > 30000) {
									alert("Excel长度超过10000条，不能使用");
								} else {
									
									var id = "";
									if(persons.length == 0) {
										alert("Excel中无数据");
									} else {
										//调用检验方法
										let item=persons[0]
										if(item&&item.发射电平){
										 if (this.data.length>0) {
										 	persons.forEach(e=>{
												let p=this.data.find(f=>f.经度===e.经度&&f.纬度===e.纬度)
												if(p==null)
												this.pushData(e)
											})
										 }else{
											 this.setData(persons)	 
										 } 
										
										}else{
										 if(this.data1&&this.data1.length>0){
											persons.forEach(e=>{
												let p=this.data.find(f=>f.经度===e.经度&&f.纬度===e.纬度)
												if(p==null)
												this.pushData1(e)
											}) 
										 }else{
											 this.setData1(persons)	
										 }
												
										}
										
										
										
									}
								}
							};
						}
					}
								
				}
				// 以二进制方式打开文件
				
				// 清空input 值 避免选择同名字的excel 文件不执行
				//
				this.setImport(false)
			},
			cancel(){
				this.setImport(false)
			}
		},
		computed:{
			...mapState({
				'importVisible':'importVisible','data':'data','data1':'data1'
			})
		}
	}
</script>

<style>
</style>
