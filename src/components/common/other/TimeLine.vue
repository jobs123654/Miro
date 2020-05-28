<template>
<VueDragResize :x='8' :w='300' :h='1' v-show='visible&&obj!=null'  @activated="onActivated" :isResizable="false" :isActive="true"  >
	<div class="panel panel-default" style="height: 270px;" >
		<div class="panel-heading" v-if="obj.info">
			{{obj.info}}<a href="#" @click="close" style="float: right;">&times;</a>
		</div>
	<div class="panel-body">
		 <Timeline>
		        <TimelineItem v-for='(i,index) in obj.items' :key='index'  >
		            <Button class="time"   @click='click(i)'>{{i}}年</Button>
		        </TimelineItem>
		        
		    </Timeline>
	</div>
	</div>
</VueDragResize>
</template>

<script>
	import VueDragResize from "vue-drag-resize";
	import bus from '../../../config/Event.js'
	export default{
	
		components:{
			VueDragResize
		},
		props:{
			
		},
		data:()=>{
			return{
				visible:false,
				obj:null
			}
		},
		methods:{
			show(e){
				this.visible=true
				this.obj=e
			},
			close(){
				this.visible=false
			},
			click(i){
				
				 bus.$emit('time',{
					 type:this.obj.info.substr(0,3),
					 value:i
				 })	
				
			},
			onActivated(){
			
			}
		},
		computed:{
			
		}
	}
</script>

<style scoped="scoped">
	.time{
		height: 18px;
	}
</style>
