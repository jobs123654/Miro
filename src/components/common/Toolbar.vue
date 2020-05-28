<template>
	<div class="btn-group-sm btn-group col-md-3" role="group">
	   <button type="button" :title="item.name" v-show='item.show'  v-for="item in obj.items" style="margin-left: 0%; ;" @click="event(item)" class="btn">
	    
		 <span v-if="item.name==='打印'" v-show="obj.showIcon" v-print="'#map'" :class="item.icon"></span>
		 <span v-else v-show="obj.showIcon" :class="item.icon"></span>
		 </button> 
	   
	   </div>
	</div>
</template>

<script>
import com from  '../../common/common.js'
import bus from '../../../config/Event.js'
export default {
 props:{
  obj:Object
 },
 data(){
    return{
     isFullScreen:true,
	 isDraw:true,
	 isSearch:true,
    }
 },
created(){
 
},
 methods:{
     event(item){
		 let key='oper'
        if (this.obj&&this.obj.items.length>0) {
        	 if (item.event==='fullScreen') {
        	 	bus.$emit(key,{key:item.event,value:this.isFullScreen})
        	 	this.isFullScreen=!this.isFullScreen
        	 }else if(item.event==='draw'){
				 bus.$emit(key,{key:item.event,value:this.isDraw})
				 this.isDraw=!this.isDraw
			 }else if(item.event==='searchVisible'){
				 bus.$emit(key,{key:item.event,value:this.isSearch})
				 this.isSearch=!this.isSearch
			 }else{
        	 	bus.$emit(key,{key:item.event})
        	 }
        }
     }
 }
}
</script>

<style>

</style>