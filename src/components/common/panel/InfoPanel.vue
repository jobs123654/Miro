<template>
  <div class="panel panel-default" v-if='info'>
  <div class="panel-heading">{{info.title}}<i style='float:right' @click='close'>&times;</i></div>
  <div class="panel-body">
    <ul>
      <li   v-for='(c,i) in info.content' :key='i'>
        {{c}}
      </li>
    </ul>
  </div>
</div>
</template>

<script>

import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
  name:"InfoPanel",
  data(){
   return{

   }
  },
  
  methods:{
   ...mapMutations([
     'setInfo'
   ]),
   close(){
     this.setInfo(null)
   }
  },
  computed:{
      ...mapState({
          info:'info'
      })
  }
}
</script>

<style>
li{list-style:none;text-align:left;}
i{cursor:pointer}
</style>