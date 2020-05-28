class MyMap{
	constructor() {
	  this.map = new ol.Map({
	          target: 'map',
	          controls: ol.control.defaults({attributionOptions: {collapsed: false}})
	              .extend([new ol.supermap.control.Logo()]),
	          view: new ol.View({
	              center: [116.46195256912856, 39.80105097717985],
	              zoom: 10,
	              projection: "EPSG:4326",
	              multiWorld: true
	          }),
	          
	          layers: [new ol.layer.Tile({
	              source: new ol.source.Tianditu({
	                  layerType: 'ter',
	                  key: "1d109683f4d84198e37a38c442d68311",
	                  projection: "EPSG:4326"
	              })
	          }), new ol.layer.Tile({
	              source: new ol.source.Tianditu({
	                  layerType: 'ter',
	                  key: "1d109683f4d84198e37a38c442d68311",
	                  isLabel: true,
	                  projection: "EPSG:4326"
	              })
	          })]
	      });
		  
		  
		  this.drawSource = new ol.source.Vector();
		  this.drawLayer = new ol.layer.Vector({
		  name:'drawLayer',
		  source: this.drawSource,
		  
		  });
		 this. map.addLayer(this.drawLayer);
		  
		  // 注册事件
		   this.map.on('singleclick',e=>{
			   console.log(e.coordinate)
			   this.addCircle({
				   center:e.coordinate,
				   radius:0.1,
			   })
		   })
	}
	addCircle(e){
	   var iconFeature = new ol.Feature({
	      geometry:new ol.geom.Circle(e.center,e.radius),
	   			type:'circle'
	    });
	   var iconStyle = new ol.style.Style({
	      fill: new ol.style.Fill({
	        color: 'rgb(12,124,210,0.4)'
	      }),
		stroke: new ol.style.Stroke({
						 color: 'rgba(0, 0, 0, 0.5)',
						 lineDash: [10, 10],
						 width: 2
		}),
		});
	    
	    iconFeature.setStyle(iconStyle);
	    this.drawSource.addFeature(iconFeature)
	}
	addMarker(e,path,dataSource){
		let lon=e.经度||e.lon,lat=e.纬度||e.lat
		let source=dataSource|| this.querySource
		let c= fromLonLat([lon,lat])
		let v=e.监测值||'',id=e.ID||''
		 var iconFeature = new ol.Feature({
		   geometry:new ol.geom.Point(c),
		   type:'icon',
		   name: id,
		   value:v,
		 });
		var iconStyle = new ol.style.Style({
		   image: new ol.style.Icon(({
		     anchor: [0.5, 1],
		     src: path
		   }))
		 });
		 iconFeature.setStyle(iconStyle);
		 source.addFeature(iconFeature)
	}
	
	// 获取地图中心
	getCenter(){
			let mapExtent = this.map.getView().calculateExtent(this.map.getSize())
			 return ol.extent.getCenter(mapExtent)
	}
	
}

let m=new MyMap('map');
