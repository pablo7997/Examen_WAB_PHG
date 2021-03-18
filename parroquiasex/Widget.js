define(['dojo/_base/declare', 'jimu/BaseWidget', "esri/tasks/QueryTask", "esri/tasks/query", "dojo/_base/lang", "esri/graphic", "esri/symbols/SimpleFillSymbol", "esri/SpatialReference", "esri/geometry/Extent"], function (declare, BaseWidget, QueryTask, Query, lang, Graphic, SimpleFillSymbol, SpatialReference, Extent) {
      //To create a widget, you need to derive from BaseWidget.
      return declare([BaseWidget], {

            // Custom widget code goes here

            baseClass: 'parroquiasex',

            cargaconcellos: function cargaconcellos() {

                  var codigoProvincia = this.selectProvincias.value;
                  if (codigoProvincia == -1) return;

                  this.selectConcellos.innerHTML = "";

                  var miqueryTask = new QueryTask(this.config.serviceconcellos);
                  var miquery = new Query();
                  miquery.returnGeometry = false;
                  miquery.outFields = ["CODCONC", "CONCELLO"];
                  miquery.orderByFields = ["CONCELLO"];
                  miquery.where = "CODPROV = " + codigoProvincia;

                  miqueryTask.execute(miquery, lang.hitch(this, function (results) {

                        var opcionpordefecto = document.createElement("option");
                        opcionpordefecto.value = -1;
                        opcionpordefecto.text = "Seleccione un Concello";
                        this.selectConcellos.add(opcionpordefecto);

                        for (var i = 0; i < results.features.length; i++) {
                              opcionpordefecto = document.createElement("option");
                              opcionpordefecto.value = results.features[i].attributes.CODCONC;
                              opcionpordefecto.text = results.features[i].attributes.CONCELLO;
                              this.selectConcellos.add(opcionpordefecto);
                        }
                  }));
            },
            cargaParroquias: function cargaParroquias() {
                  var codigoparroquia = this.selectConcellos.value;
                  if (codigoparroquia == -1) return;

                  var miqueryTask2 = new QueryTask(this.config.serviceparroquia);
                  var miquery2 = new Query();
                  miquery2.returnGeometry = false;
                  miquery2.outFields = ["CODPARRO", "PARROQUIA"];
                  miquery2.orderByFields = ["PARROQUIA"];
                  miquery2.where = "CODCONC = " + codigoparroquia;

                  miqueryTask2.execute(miquery2, lang.hitch(this, function (results2) {

                        var opcionpordefecto2 = document.createElement("option");
                        opcionpordefecto2.value = -1;
                        opcionpordefecto2.text = "Seleccione una Parroquia";
                        this.selectParroquias.add(opcionpordefecto2);
                        console.log(results2);
                        for (var i = 0; i < results2.features.length; i++) {
                              opcionpordefecto2 = document.createElement("option");
                              opcionpordefecto2.value = results2.features[i].attributes.CODPARRO;
                              opcionpordefecto2.text = results2.features[i].attributes.PARROQUIA;
                              this.selectParroquias.add(opcionpordefecto2);
                        }
                  }));
            },

            zoomConcello: function zoomConcello() {

                  var miqueryTask3 = new QueryTask(this.config.serviceconcellos);
                  var miquery3 = new Query();
                  miquery3.returnGeometry = true;
                  miquery3.where = "CODCONC = " + this.selectConcellos.value;

                  miquery3.outSpatialReference = new SpatialReference(102100);

                  miqueryTask3.execute(miquery3, lang.hitch(this, function (results) {
                        if (results.features.length > 0) {
                              var geometria = results.features[0].geometry;
                              this.map.graphics.clear();
                              this.map.graphics.add(new Graphic(geometria, new SimpleFillSymbol()));
                              this.map.setExtent(geometria.getExtent(), true);
                        }
                  }));
            },

            zoomParroquia: function zoomParroquia() {

                  var miqueryTask4 = new QueryTask(this.config.serviceparroquia);
                  var miquery4 = new Query();
                  miquery4.returnGeometry = true;
                  miquery4.where = "CODPARRO = " + this.selectParroquias.value;
                  console.log(this.selectParroquias);
                  miquery4.outSpatialReference = new SpatialReference(102100);
                  console.log(miquery4);
                  miqueryTask4.execute(miquery4, lang.hitch(this, function (results) {
                        console.log(results);
                        if (results.features.length > 0) {
                              var geometria2 = results.features[0].geometry;
                              this.map.graphics.clear();
                              this.map.graphics.add(new Graphic(geometria2, new SimpleFillSymbol()));
                              this.map.setExtent(geometria2.getExtent(), true);
                        }
                  }));
            }

            //methods to communication between widgets:

      });
});
//# sourceMappingURL=Widget.js.map
