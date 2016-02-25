sap.ui.define([
   "sap/ui/demo/nav/controller/BaseController"
], function (BaseController) {
   "use strict";
   return BaseController.extend("sap.ui.demo.nav.controller.NotFound", {
      onInit: function () {
      	var router, target;
      	router = this.getRouter();
      	target = router.getTarget("notFound");
      	target.attachDisplay(function(evt) {
      		this._oData = evt.getParameter("data"); // store data for next view?
      	}, this);
      },
      // overwrite parent method
      onNavBack: function() {
      	//var history, previousHash, router;
      	if (this._oData && this._oData.fromTarget) {
      		this.getRouter().getTargets().display(this._oData.fromTarget);
      		delete this._oData.fromTarget;
      		return;
      	}
      	BaseController.prototype.onNavBack.apply(this, arguments);
      }
   });
});
