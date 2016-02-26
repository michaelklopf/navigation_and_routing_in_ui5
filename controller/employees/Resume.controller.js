sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";
	var _validTabKeys = ["Info", "Projects", "Hobbies", "Notes"];
	
	return BaseController.extend("sap.ui.demo.nav.controller.employees.Resume", {
		onInit: function () {
			var router = this.getRouter();
			this.getView().setModel(new JSONModel(), "view");
			router.getRoute("employeeResume").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched : function (oEvent) {
			var args, view, query;
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
			query = args["?query"];
			if (query && _validTabKeys.indexOf(query.tab) > -1) {
				view.getModel("view").setProperty("/selectedTabKey", query.tab);
				// lazy loading of tabs is done here
				if (query.tab === "Hobbies" || query.tab === "Notes") {
					// targets are resumeTabHobbies or resumeTabNotes hence
					this.getRouter().getTargets().display("resumeTab" + query.tab);
				}
			} else {
				this.getRouter().navTo("employeeResume", {
					employeeId: args.employeeId,
					query: {
						tab: _validTabKeys[0]
					}
				}, true); // ho history entry
			}
		},
		_onBindingChange : function () {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
		onTabSelect: function(evt) {
			var ctx = this.getView().getBindingContext();
			this.getRouter().navTo("employeeResume", {
				employeeId: ctx.getProperty("EmployeeID"),
				query: {
					tab: evt.getParameter("selectedKey")
				}
			}, true);
		}
	});
});