let ui={
    
	title:'基于GIS的中国东南沿海城市台风灾害风险评估系统',
    navigation:{
        title:'基于GIS的中国东南沿海城市台风灾害风险评估系统',
        showIcon:true,
        items:[
           
            {
                name:'数据采集',
                event:'get',
                active:'',
               
            },
            {
                name:'图像绘制',
                event:'showPath',
                active:'',
                
            },
            {
                name:'台风预警',
                event:'yuce',
                active:'',
               
            },
            {
                name:'灾害评估',
                event:'pinggu',
                active:'',
               
            },
			
        ],
		dropdown:{
			title:"组件",
			items:[
			{
				name:'指北针',
				checked:false,
				show:true,
				event:'compass'
			},
			{
				name:'图例',
				checked:false,
				show:true,
				event:'legend'
			},
			{
				name:'比例尺',
				show:true,
				checked:false,
				event:'scaleLine'
			},
			{
				name:'鹰眼',
				show:true,
				checked:false,
				event:'eagleEye'
			},
			{
				name:'图层管理器',
				show:false,
				checked:false,
				event:'layerManager'
			},
			{
				name:'缩放滑动',
				show:true,
				checked:false,
				event:'zoomSlide'
			},
			{
				name:'地图全屏',
				show:false,
				checked:false,
				event:'fullScreen'
			},
			]
		},
    },
    map:{
	  tiles:[
		  {
			  name:'经纬度投影',
			  isGroup:true,
			   
			  url:'https://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=cfa36f03511543fa5827f3034250d933'
		      // url:'http://t0.tianditu.gov.cn/img_c/wmts?tk=cfa36f03511543fa5827f3034250d933'
			  // url:'http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=cfa36f03511543fa5827f3034250d933'
		  },
		  {
			  name:'天地图文字标注',
			  isGroup:true,
			
			   url:'https://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=cfa36f03511543fa5827f3034250d933'
		  },
		  
	  ],
	 
	  
	  center: [143.5,15],
	  
	  zoom: 4,
	  legend:{
			  title:'图例',
			  items:[
				    {name:'超强台风',value:'#f46d43'},
					{name:'强台风',value:'#fdae61'},
					{name:'台风',value:'#ffffbf'},
					{name:'强热带风暴',value:'#66bd63'},
					{name:'热带风暴',value:'#006837'},
					{name:'热带低压',value:'#006837'},
			  ]
	  },
	  compass:{
	  		src:require('../src/assets/compass.png')
	  },
	  toolbar:{
	      showIcon:true,
	      items:[
	  		    {name:'查询',event:'searchVisible',show:false,icon:'glyphicon glyphicon-search'},
	  		    {name:'全屏',event:'fullScreen',show:true, icon:'glyphicon glyphicon-fullscreen'},
	  			{name:'放大',event:'zoomIn',show:true,icon:'glyphicon glyphicon-zoom-in'},
	  			{name:'缩小',event:'zoomOut',show:true,icon:'glyphicon glyphicon-zoom-out'},
	  			{name:'标绘',event:'draw',show:false,icon:'glyphicon glyphicon-tag'},
	  			{name:'复位',event:'geo',show:true,icon:'glyphicon glyphicon-map-marker'},
	  		 // {name:'打印',event:'print',show:true,icon:'glyphicon glyphicon glyphicon-print'},
	  		   {name:'导出',event:'export',show:false,icon:'glyphicon glyphicon-picture'},
	  		   {name:'测距',event:'distance',show:false,icon:'glyphicon glyphicon-resize-full'},
	  		   {name:'测面',event:'area',show:false,icon:'glyphicon glyphicon-unchecked'},
	  		   
	  		   {name:'清除',event:'clear',show:true,icon:'glyphicon glyphicon-erase'},
	  		
	      ]
	  },
	  searchList:{
		  items:[
			  {
				  name:'基站',
				  icon:'ios-radio-outline',
				  key:'rad',
				  checked:false,
				  path:require('../src/assets/rad.png')
			  },
			  {
				  name:'巡测点',
				  icon:'ios-pin',
				  key:'mes',
				   checked:false,
				  path:require('../src/assets/mes.png')
			  },
			  {
				  name:'学校',
				  icon:'ios-school',
				  key:'school',
				   checked:false,
				   path:require('../src/assets/school.png')
			  },
			  {
				  name:'居民区',
				  icon:'md-contacts',
				  key:'room',
				  checked:false,
				  path:require('../src/assets/room.png')
			  },
			  ]
	  }
    },
    dataManager:[
        {
            name:"台风路径数据",
            active:'active',
            children:[]
        },
        {
            name:"降雨量",
            active:'',
            children:[]
        },
		// {
		//     name:"用户信息",
		//     active:'',
		//     children:[]
		// },
    ],
	tree:{
			 title: '数据源',
			  items:[
				  {
			      title: '辐射源数据',
				  selected: false,
				  },
				  {
				  title: '测量数据',
				  selected: false,
				  },
			  ]
	},
	/* 标绘 */
	// target:[
	// 	{
	// 		name:'xx幼儿园/小/中学',
	// 		type:'学校',
	// 		lon:'',
	// 		lat:''
	// 	},
	// 	{
	// 		name:'xx园/小区',
	// 		type:'居民区',
	// 		lon:'',
	// 		lat:''
	// 	},
	// ]
	
}
export  {
    ui
}