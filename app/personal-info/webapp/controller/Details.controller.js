sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/constants"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, constants) {
        "use strict";

        return Controller.extend("personalinfo.controller.Details", {
            onInit: function () {
                this.oSFModel = this.getOwnerComponent().getModel();
                this.oModel = this.getOwnerComponent().getModel("personalInfoModel");
                this.initJsonModel();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatched, this);
            },

            _onObjectMatched: async function (oEvent) {
                this.fetchUsersInformation(oEvent).then((oData) => {
                    this.oModel.setProperty("/busy", false);
                }).catch((oErr) => {
                    this.oModel.setProperty("/busy", false);
                });
            },

            initJsonModel: function () {
                this.oModel.setData(constants);
            },

            fetchUsersInformation: async function (oEvent) {
                try {
                    return new Promise(function (resolve, reject) {
                        var args = oEvent.getParameter("arguments");
                        console.log('arguments', args)
                        var userId = args.userId;
                        console.log("Clicked Row Details in the second page:", userId);
                        this.oModel.setProperty("/busy", true);
                        this.oSFModel.setDeferredGroups(["batchUsersInformation"]);
                        this.oSFModel.callFunction("/UsersInformation", {
                            method: "GET",
                            batchGroupId: "batchUsersInformation",
                            urlParameters: {
                                userId: userId
                            }
                        });
                        this.oSFModel.submitChanges({
                            batchGroupId: "batchUsersInformation",
                            success: function (oData) {
                                var aUsers = []
                                if (oData.__batchResponses[0].statusCode == '200') {
                                    aUsers = oData.__batchResponses[0].data.results;
                                }
                                this.oModel.setProperty("/Users", aUsers);
                                console.log(aUsers);
                                resolve(true);
                            }.bind(this),
                            error: function (oError) {
                                reject(oError);
                            }.bind(this)
                        });
                    }.bind(this));

                } catch (oErr) {
                    reject(oErr);
                    this.oModel.setProperty("/busy", false);
                }
            }




        });
    });