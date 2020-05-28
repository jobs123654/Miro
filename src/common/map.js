
class MyMap{
	constructor() {
		this.base='http://localhost:8090/iserver/services/map-China/rest/maps/hebei'
		this.url="http://localhost:8090/iserver/services/data-China/rest/data";
	      let layer=[
		 // new ol.layer.Tile({
	  //             source: new ol.source.Tianditu({
	  //                 layerType: 'ter',
	  //                 key: "1d109683f4d84198e37a38c442d68311",
	  //                 projection: "EPSG:4326"
	  //             })
	  //         }), new ol.layer.Tile({
	  //             source: new ol.source.Tianditu({
	  //                 layerType: 'ter',
	  //                 key: "1d109683f4d84198e37a38c442d68311",
	  //                 isLabel: true,
	  //                 projection: "EPSG:4326"
	  //             })
	  //         }),
			   new ol.layer.Tile({
				  source: new ol.source.TileSuperMapRest({
					  url: this.base,
					  wrapX: true
				  }),
				  projection: 'EPSG:4326'
			  })
			  
			  ]
	  this.map = new ol.Map({
		  target: 'map',
		  controls: [],
		  view: new ol.View({
			  center: [933131.605712229,4858132.071129574],
			  //center:[-10, 15],
			  zoom: 7,
			  // projection: "EPSG:4326",
			  // multiWorld: true
		  }),
		  layers: layer
	  });
	let  styles = [
			  new ol.style.Style({
				stroke: new ol.style.Stroke({
				  color: 'blue',
				  width: 1
				}),
				fill: new ol.style.Fill({
				  color: 'rgba(0, 0, 255, 0.2)'
				})
			  }),
			 
		],styles1=new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(0, 0, 255, 0.1)'
                }),
				image: new ol.style.Circle({
				    radius: 7,
				     fill: new ol.style.Fill({
				     color: '#ffcc33'
				       })
				  })
			});
	  this.drawTool=null
	  this.drawSource = new ol.source.Vector();
	  this.drawLayer = new ol.layer.Vector({
	  name:'drawLayer',
	  source: this.drawSource,
	  style:styles
	  });
	  this.resultSource=new ol.source.Vector();
	  this.resultLayer = new ol.layer.Vector({
	  name:'resultLayer',
	  source: this.resultSource,
	  style:styles1
	  });
	 this.overview=new ol.control.OverviewMap({layers:this.map.getLayers()})
	 this.zoom=new ol.control.Zoom()
	 this.scale=new ol.control.ScaleLine()
	 this.fullscreen=new ol.control.FullScreen()
	 
	
	 this.container = document.getElementById('popup');
	 this.content = document.getElementById('popup-content');
	 this.closer = document.getElementById('popup-closer');
	 this.popup = new ol.Overlay({
      element: this.container,
     
	  autoPan: true,
	  autoPanAnimation: {
	  	 		duration: 250
	  }
    });
		this.map.addOverlay(this.popup);
   
	 this.controlMap=new Map([
		 ['鹰眼图',this.overview],
		 ['缩放',this.zoom],
		 ['比例尺', this.scale],
		 ['全屏',this.fullscreen],
	 ])
	 
	 
	 this. map.addLayer(this.drawLayer);
	  this. map.addLayer(this.resultLayer);
	  // 注册事件
	 this.map.on('singleclick',e=>{
		 this.mapClick(e)
	 })
	 
	 /* 右键事件*/
	 setTimeout(e=>{
		 if(document.getElementById){
		 		document.getElementById('map').oncontextmenu=e=>{
		 				   this.map.removeInteraction(this.drawTool);
		 		} 
		 }
	 },1000)
	
	 this.closer.onclick=e=>{
		 this.popup.setPosition(undefined);
		  this.closer.blur();
	 }
	
}
	setZoom(n){
       this.map.getView().setZoom(n)
	}
/* Point</option>
 LineString</option>
 Polygon</option>
 Circle</option> */
	/* 激活*/
	activeDrawTool(type) {
	   this.map.removeInteraction(this.drawTool);
	  if (type !== 'LK') {
	    this.drawTool= new ol.interaction.Draw({
	      source: this.drawSource,
	      type: type
	    });
	  }else{
		  this.drawTool=ol.interaction.Draw.createBox()
	  }
	  this.drawTool.on('drawend',e=>{
	  	let g=e.feature.values_.geometry
	  	this.queryByPolygon( ["World:Capitals"],g,'INTERSECT');
	  })
	  this.map.addInteraction(this.drawTool);
	}
	getDistance( o1,o2){
		let lat1=o1.纬度||o1.lat, lng1=o1.经度||o1.lon
		let lat2=o2.纬度||o2.lat, lng2=o2.经度||o2.lon
	    var radLat1 = lat1*Math.PI / 180.0;
	    var radLat2 = lat2*Math.PI / 180.0;
	    var a = radLat1 - radLat2;
	    var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
	    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
	    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
	    s = s *6378.137 ;// EARTH_RADIUS;
	    s = Math.round(s * 10000) / 10000;
	    return s;
	}

	/* 地图点击 */
	mapClick(evt){
		// console.log(e.coordinate)
		// this.addCircle({
		//    center:e.coordinate,
		//    radius:0.1,
		// })
	      let pixel = this.map.getEventPixel(evt.originalEvent),dom=document.getElementById('popup-content')
	      var feature = this.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
	        return feature;
	      });
	   
	      if (feature) {//values_
	        var coordinates = feature.getGeometry().getCoordinates();
			let s=''
			for(let k in feature.values_){
				if(k!=='geometry'){
					s+=k+' '+feature.values_[k]+'<br/>'
				}
			}
			if(s!==''){
				dom.innerHTML=s;
			 this.popup.setPosition(evt.coordinate);
			 this.container.style.display='block'
			}else{
				 this.container.style.display='none'
			}
		   
	       
			
	     } 
	}
	/* 图层动画 */
	panTo(e,fn){
		 this.map.getView().animate({
		    center: e,
		    duration: 2000
		  });
		  setTimeout(e=>{
			  fn();
		  },1000)
	}

	/* 画圆 */
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
	/* 添加控件 */
	addControl(e){
		let {key,val}=e
		if (val) {
		   let c=this.controlMap.get(key)
		   this.map.addControl(c);
		}else{
			let item=this.controlMap.get(key)
			if(item){
				this.map.removeControl(item)
			}
		}
	}
	/* 添加marker */
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
	/* 测距测面 */
	measure(type){
		   let feature='';
		   let typeMap=new Map([
			   ['LineString','米'],
			   ['Polygon','平方米']
		   ])
		   this. interaction = new ol.interaction.Draw({
		        source: this.drawSource,
		        type: type
		    });
		    this.interaction.on('drawstart', function (evt) {
		        feature = evt.feature;
		    });
		   this. interaction.on('drawend', ()=> {
		        var MeasureParam = new SuperMap.MeasureParameters(feature.getGeometry());
		        let m=new ol.supermap.MeasureService(this.base, {measureMode: ""})
				if(type==='LineString'){
				m.measureDistance(MeasureParam,  (serviceResult)=> {
					alert(serviceResult.result.distance+ typeMap.get(type));
				
				});
				}else{
				m.measureArea(MeasureParam,  (serviceResult)=> {
					alert(serviceResult.result.area + typeMap.get(type));
				
				});
			 }
				this.lostFocus()
		    });
		
		  this.map.addInteraction(this.interaction);
	}
	/* 移除测量工具 */
	lostFocus(){
		this.map.removeInteraction(this.interaction);
	}
	/* 查询 */
	/* 根据id查询 */
	queryById(ds,ids){
		//指定ID查询处理
		let {url }= this;
		//数据集ID查询服务参数
		var idsParam = new SuperMap.GetFeaturesByIDsParameters({
		    IDs:ids,
		    datasetNames: ds
		});
		//向服务器发送请求，并获取结��?
		new ol.supermap.FeatureService(url).getFeaturesByIDs(idsParam,e=>{
			this.showResult(e)
		} );
	}
	/* SQL */
	queryBySql(ds,sql){
		let sqlParam = new SuperMap.GetFeaturesBySQLParameters({
			queryParameter: {
			  attributeFilter: sql
			},
			datasetNames: ds
		});
		new ol.supermap.FeatureService(this.url).getFeaturesBySQL(sqlParam, e=>{
			this.showResult(e)
		} );
	}
	
	/* 矩形 */
	queryByReact(ds,polygon){
		//添加查询区域
		// var polygon = new ol.geom.Polygon([[[-20, 20], [-20, -20], [20, -20], [20, 20], [-20, 20]]]);
		var polygonSource = new ol.source.Vector({
			features: [new ol.Feature(polygon)],
			wrapX: false
		});
		vectorLayer = new ol.layer.Vector({
			source: polygonSource,
			style: new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'red',
					width: 3
				}),
				fill: new ol.style.Fill({
					color: 'rgba(0, 0, 255, 0.1)'
				})
			})
		});
		this.map.addLayer(vectorLayer);
		//创建集Bounds查询服务
		var boundsParam = new SuperMap.GetFeaturesByBoundsParameters({
			datasetNames: ds,
			bounds: polygon.getExtent()
		});
		new ol.supermap.FeatureService(this.url).getFeaturesByBounds(boundsParam, e=>{
			this.showResult(e)
		} );
	}
	/*任意图形 */
	queryByPolygon(ds,polygon, mode){
		 // polygon = new ol.geom.Polygon([[[0, 0], [-10, 30], [-30, 0], [0, 0]]])
		// 设置几何查询参数
		
		var geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
		    datasetNames:ds,
		    geometry: polygon,
		    spatialQueryMode: mode // 相交空间查询模式 "INTERSECT"
		});
		// 创建几何范围查询实例
		new ol.supermap.FeatureService(this.url).getFeaturesByGeometry(geometryParam, e=>{
			this.showResult(e)
		} );
	}
	
	/* 缓冲��?*/
	queryByBuffer(ds,polygon, length){
		 // var polygon = new ol.geom.Polygon([[[-20, 20], [-20, -20], [20, -20], [20, 20], [-20, 20]]]);
		        var polygonSource = new ol.source.Vector({
		            features: [new ol.Feature(polygon)],
		            wrapX: false
		        });
		        vectorLayer = new ol.layer.Vector({
		            source: polygonSource,
		            style: new ol.style.Style({
		                stroke: new ol.style.Stroke({
		                    color: 'red',
		                    width: 3
		                }),
		                fill: new ol.style.Fill({
		                    color: 'rgba(0, 0, 255, 0.1)'
		                })
		            })
		        });
		        map.addLayer(vectorLayer);
		
		        var bufferParam = new SuperMap.GetFeaturesByBufferParameters({
		            datasetNames: ds,
		            bufferDistance: length,
		            geometry: polygon
		        });
		        new ol.supermap.FeatureService(url).getFeaturesByBuffer(bufferParam,e=>{
			this.showResult(e)
		}  );
	}
	/* 显示查询结果 */
	showResult(serviceResult){
	 	if (!serviceResult.result) {
	 		return
	 	}
		
		let f=serviceResult.result.features;
		try{
			
			if(f.features&&f.features.length>0){
				 f=(new ol.format.GeoJSON()).readFeatures(f)
				f.forEach(e=>{
				  this.resultSource.addFeature(e)	
				})
			}else{
				
			}
		}catch(e){
			console.log(e)
		}
		
	 	
	 	
	}
	
	
	/* 单值专题图 */
	singleValue(ds,name,where,){
	  let getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
	  getFeatureParam = new SuperMap.FilterParameter({
	      name: name,//��?
	      attributeFilter:where
	  });
	  getFeatureBySQLParams = new SuperMap.GetFeaturesBySQLParameters({
	      queryParameter: getFeatureParam,
	      toIndex: 500,
	      datasetNames: ds
	  });
	  getFeatureBySQLService = new SuperMap.GetFeaturesBySQLService(this.url, {
	      format: SuperMap.DataFormat.ISERVER,
	      eventListeners: {"processCompleted": this.processCompleted, "processFailed": this.processFailed}
	  });
	  getFeatureBySQLService.processAsync(getFeatureBySQLParams);
	
	 }
	processCompleted(getFeaturesEventArgs) {
	    var result = getFeaturesEventArgs.result;
	    var feas = [];
	    if (result && result.features) {
	        var features = result.features
	        var IHFeas = []; //岛洞多面
	        for (var i = 0, len = features.length; i < len; i++) {
	            var feature = features[i];
	            var smid = feature.fieldValues[0];
	            if (smid === "86" || smid === "87" || smid === "89") {
	                // islandHoleHandlerForFeature 处理岛洞��?
	                IHFeas.push(islandHoleHandlerForFeature(feature));
	            }
	            else {
	                feas.push(feature);
	            }
	        }
	        // 岛洞多面要素必需在其他要素之前添��?
	        feas = IHFeas.concat(feas);
	        themeSource = new ol.source.Unique("ThemeLayer", {
	            map: this.map,
	            attributions: " ",
	            style: {
	                shadowBlur: 3,
	                shadowColor: "#000000",
	                shadowOffsetX: 1,
	                shadowOffsetY: 1,
	                fillColor: "#FFFFFF"
	            },
	            isHoverAble: true,
	            highlightStyle: {
	                stroke: true,
	                strokeWidth: 2,
	                strokeColor: 'blue',
	                fillColor: "#00F5FF",
	                fillOpacity: 0.2
	            },
	            themeField: "LANDTYPE",
	            styleGroups: [
	                // {
	                //     value: "草地",
	                //     style: {
	                //         fillColor: "#C1FFC1"
	                //     }
	                // },
	                // {
	                //     value: "城市",
	                //     style: {
	                //         fillColor: "#CD7054"
	                //     }
	                // },
	                // {
	                //     value: "灌丛",
	                //     style: {
	                //         fillColor: "#7CCD7C"
	                //     }
	                // },
	                // {
	                //     value: "旱地",
	                //     style: {
	                //         fillColor: "#EE9A49"
	                //     }
	                // },
	                // {
	                //     value: "湖泊水库",
	                //     style: {
	                //         fillColor: "#8EE5EE"
	                //     }
	                // },
	                // {
	                //     value: "经济��?,
	                //     style: {
	                //         fillColor: "#548B54"
	                //     }
	                // },
	                // {
	                //     value: "沙漠",
	                //     style: {
	                //         fillColor: "#DEB887"
	                //     }
	                // },
	                // {
	                //     value: "水浇��?,
	                //     style: {
	                //         fillColor: "#E0FFFF"
	                //     }
	                // },
	                // {
	                //     value: "水田",
	                //     style: {
	                //         fillColor: "#388E8E"
	                //     }
	                // },
	                // {
	                //     value: "用材��?,
	                //     style: {
	                //         fillColor: "#556B2F"
	                //     }
	                // },
	                // {
	                //     value: "沼泽",
	                //     style: {
	                //         fillColor: "#2F4F4F"
	                //     }
	                // },
	                // {
	                //     value: "缺省风格",
	                //     style: {
	                //         fillColor: "#ABABAB"
	                //     }
	                // }
	            ]
	        });
	        themeSource.addFeatures(feas);
	        //专题图层 mousemove 事件
	        themeSource.on('mousemove', function (e) {
	            if (e.target && e.target.refDataID) {
	                document.getElementById("infoBox").style.display = "block";
	                var fid = e.target.refDataID;
	                var fea = themeSource.getFeatureById(fid);
	                if (fea) {
	                    // document.getElementById("infoContent").innerHTML = "";
	                    // document.getElementById("infoContent").innerHTML += "ID: " + fea.attributes.SMID + "<br/>";
	                    // document.getElementById("infoContent").innerHTML += resources.text_landType+": " + fea.attributes.LANDTYPE + "<br/>";
	                    // document.getElementById("infoContent").innerHTML += resources.text_area + parseFloat(fea.attributes.SMAREA).toFixed(5) + "<br/>";
	                }
	            }
	            else {
	                // document.getElementById("infoContent").innerHTML = "";
	                // document.getElementById("infoBox").style.display = "none";
	            }
	        });
			
	        var pointerInteraction = new ol.interaction.Pointer({
	            handleMoveEvent: function (event) {
	                themeSource.fire('mousemove', event);
	            }
	        });
	        map.addInteraction(pointerInteraction);
	        themeLayer = new ol.layer.Image({
	            source: themeSource
	        });
	        themeLayer.setOpacity(0.8);
	       this. map.addLayer(themeLayer);
	    }
	}
	processFailed(e){
		console.log('查询失败'+e)
	}
	clear(){
		let layer=this.map.getLayers().getArray();
		if (layer.length) {
			layer.forEach(e=>{
				e.getSource().clear()
			})
		}
		this.popup.setPosition(undefined);
		 this.closer.blur();
	}
}

