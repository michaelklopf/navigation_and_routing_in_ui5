sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("sap.ui.demo.nav.controller.employees.Employee", {
		onInit: function () {
			var router = this.getRouter();
			router.getRoute("employee").attachMatched(this._onRouteMatched, this);
			// Hint: we don't want to do it this way
			/*
			oRouter.attachRouteMatched(function (evt){
				var routeName, args, view;
				routeName = evt.getParameter("name");
				if (routeName === "employee"){
					this._onRouteMatched(evt);
				}
			}, this);
			*/
		},
		_onRouteMatched : function (evt) {
			var args, view;
			args = evt.getParameter("arguments");
			view = this.getView();

			view.bindElement({
				path : "/Employees(" + args.employeeId + ")",
				events : {
					change: this._onBindingChange.bind(this),
					// handle the busy state here
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
		},
		onShowResume: function() {
			var ctx = this.getView().getElementBinding().getBoundContext();
			
			this.getRouter().navTo("employeeResume", {
				employeeId: ctx.getProperty("EmployeeID")
			});
		}
	});
});