sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("sap.ui.demo.nav.controller.employees.EmployeeList", {
		onListItemPressed: function(evt) {
			var item, ctx;
			item = evt.getSource();
			ctx = item.getBindingContext();
			this.getRouter().navTo("employee", {
				employeeId : ctx.getProperty("EmployeeID")
			});
		}
	});
});