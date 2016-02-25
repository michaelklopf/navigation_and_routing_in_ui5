sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("sap.ui.demo.nav.controller.employees.Resume", {
		onInit: function () {
			var router = this.getRouter();
			router.getRoute("employeeResume").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched : function (oEvent) {
			var args, view;
			args = oEvent.getParameter("arguments");
			view = this.getView();
			view.bindElement({
				path : "/Employees(" + args.employeeId + ")",
				events : {
					change: this._onBindingChange.bind(this),
					dataRequested: function () {
						view.setBusy(true);
					},
					dataReceived: function () {
						view.setBusy(false);
					}
				}
			});
		},
		_onBindingChange : function () {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		}
	});
});