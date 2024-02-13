using {ECEmploymentInformation} from './external/ECEmploymentInformation.csn';
using {ECFoundationOrganization} from './external/ECFoundationOrganization.csn';
using {FoundationPlatformPLT} from './external/FoundationPlatformPLT.csn';


service PersonalinformationService @(path: '/personalInformation') @(requires: ['authenticated-user']) {

    entity fetchUsers as
        projection on ECEmploymentInformation.EmpJob {
            key userId,
            department,
            *
        };

    function UsersInformation(userId : String) returns array of {
        userId : String;
        username : String;
        defaultFullName : String;
        firstName : String;
        email : String;
        cellPhone : String;
        businessPhone : String;
        country : String;
        photo : String;
        addressLine1 : String;
        adressLine2 : String;
        adressLine3 : String;
        jobFamily : String;
        jobLevel : String;
        jobRole : String;
        jobTitle : String;
    };
    
}
