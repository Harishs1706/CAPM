sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("personalinfo.controller.Home", {
            onInit: function () {
                this.oSFModel = this.getOwnerComponent().getModel();
                this.oModel = this.getOwnerComponent().getModel("personalInfoModel");
            },
            onItemPress: function (oEvent) {
                var param = oEvent.getSource();
                if (param) {
                    var userId = param.getBindingContext();
                    if (userId) {
                        var id = userId.getProperty('userId');
                    }
                }
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Details", {
                    userId: id
                });
            }

        });
    });
