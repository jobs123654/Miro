<template>
  <div id="index" class="container-fluid">
       
    <div class="row">
       <!-- 导航栏 -->
      <div class="col-md-12">
         <Navigation class="navigation" :obj="ui.navigation"/>
      </div>
      <!-- 地图 -->
       <div class="col-md-12 mapc" style="margin-top: -1.3%;">
           <Map obj='ui.map' :obj='ui.map' ref='map' v-show='mapVisible' class="map"/>
           <DataManager :obj='ui.dataManager' class='data' v-show="dataVisible"/>
      </div>
    </div>
  
	
	
	
    <!-- 二级菜单 -->
    <SecondMenu class="SecondMenu c" v-show='mapVisible' />
    <!-- 信息面板 -->
    <InfoPanel class="InfoPanel c"/>
	
	<VueDragResize  :isActive="true" :isResizable="false"  @activated="activateEv(0)">
			<!-- 表单面板 -->
			<FormPanel  class="FormPanel c"/>
	</VueDragResize>
	<!-- 导入文件 -->
	<VueDragResize :isActive="true" :x="x" :y='y' :isResizable="false"  @activated="activateEv(1)">
			<Import class='Import'/>
	</VueDragResize>
	  <!-- <DropDownMenu class='T c' :obj="ui.navigation.dropdown"/> -->
	<VueDragResize :x='800' :isResizable="false" :isActive="true"  >
		<TablePanel class='TablePanel c' />
	</VueDragResize>
	
	
	<CircleProgress class='CircleProgress c'/>
   <VueDragResize :isActive="true" :x="x" :y='y' :isResizable="false"  @activated="activateEv(1)">
			<Path1 class='Path' ></Path1>
	</VueDragResize>
	
  </div>
</template>

<script>
let {clientHeight}=document.documentElement.clientHeight
import VueDragResize from "vue-drag-resize";
import {ui} from '../../config/ui.js'
import DropDownMenu from './common/menu/DropDownMenu'
import Navigation from './common/Navigation'
import SecondMenu from './common/menu/SecondMenu'
import InfoPanel from './common/panel/InfoPanel'
import FormPanel from './common/panel/FormPanel'
import Import from './common/Import'
import MyTree from './common/MyTree'
import TablePanel from './common/panel/TablePanel'
import Map from './map/Map'
import CircleProgress from './common/progress/CircleProgress'
import Progress from './common/progress/Progress'
import DataManager from './DataManager'
import {mapState,mapMutations} from 'vuex'
import bus from '../../config/Event.js'
import Path1 from './yw/Path'
export default {
  name: 'Index',
  components: {
    Navigation,Map,SecondMenu,InfoPanel,DataManager,FormPanel,VueDragResize,Import,TablePanel,
	CircleProgress,Progress,DropDownMenu,Path1
  },
 
  data(){
    return{
      ui:ui,
	  x:500,
	  y:100,
    }
  },
  created() {
  	let u=JSON.parse(localStorage.getItem('u'))
	if(!u){
	   this.$router.push({path:'/login'});
	}
  },
  methods:{
	 ...mapMutations([
		 'setProgressValue',
	 ]),
   activateEv(index) {
     
	   let fs=document.getElementById('form'),input=fs&&fs.getElementsByTagName('input'),select=fs&&fs.getElementsByTagName('select')
       if(input&&input.length>0){
		   
		   for (let i in input) {
		     if(isNaN(input[i]))
			
			 input[i].onclick=e=>{
				input[i]. focus()
			 }
		   }
		  
	   }
	   if(select&&select.length>0){
	   		for (let i in select) {
	   		  if(isNaN(select[i]))
			  select[i].onclick=e=>{
	   		  select[i]. focus()
	   			}
	   		}   
	   }
	 }
  },
  computed:{
    ...mapState({
	   mapVisible:'mapVisible',
       dataVisible:'dataVisible',
    }),
	list(){
	  return JSON.parse(localStorage.getItem('users'))
	}
	
  }
}
</script>

<style scoped>
	.vdr.active:before{
	  outline: none
	}
#index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.c{
  position: absolute;
}
.T{
	right: 4%;
	top: 35%
}
.navigation{
  position: relative;
  top: 1%;
}

.SecondMenu{
  right: 4%;
  top: 35%
}
.InfoPanel{
  left: 2%;
  top: 10%
}
.FormPanel{
	left: 40%;
	top: 30%
}
.mapc{
  top: 8%
}
.map,.data{
  height: 650px;
  z-index: -1;
}
.Import{
		position: absolute;
		width: 300px;
		left: 40%;
		top: 30%;
	}

.TablePanel{
	width: 600px;
	right:15%;
	top: 29%;
}
.CircleProgress{
	left:48%;
	top: 40%;
}
.Path{
	
	width: 400px;
}

</style>
