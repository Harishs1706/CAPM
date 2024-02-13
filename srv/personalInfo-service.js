const cds = require('@sap/cds');
const { personalInfo } = require("./handler");

class PersonalinformationService extends cds.ApplicationService {
    init() {
        // Fetch Users
        this.on(['READ'], 'fetchUsers', personalInfo.usersInformation);

        //Fetch Users Information
        this.on('UsersInformation', personalInfo.fetchUsersInformation);

        return super.init();
    }


};

module.exports = {
    PersonalinformationService
};