<template>
<div class="btn-group-vertical" role="group" v-if="this.obj" >
  <button type="button" style="margin-top: 10%"  :key="i" v-for="(item,i) in obj.items" @click="event(item)" class="btn btn-defualt">
        <span v-show="obj.showIcon" :class="item.icon"></span>&nbsp;<span>{{item.name}}</span>
 </button> 
 
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
 name:'SecondMenu',
 data(){
     return{
       
     }
 },
 methods:{
  ...mapMutations([
   'setInfo'
  ]),
  event(item){
   //测试
   let c={title:'1111',content:[1,2,34]}
   this.setInfo(c)
  },
 
 },
 computed:{
     obj(){
         return this.$store.state.secondMenu;
     }
 }
}
</script>

<style>

</style>