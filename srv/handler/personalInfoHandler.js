const cds = require("@sap/cds");
(async function () {
    sfecfo = await cds.connect.to("ECFoundationOrganization");
    sfecei = await cds.connect.to("ECEmploymentInformation");
    sfecfp = await cds.connect.to("FoundationPlatformPLT");
    sfecum = await cds.connect.to("PLTUserManagement");
})();

const usersInformation = async (req) => {
    try {
        const managerId = req.user.id;
        console.log(managerId);
        const txecei = sfecei.transaction(req);
        let aEmpInfo = await txecei.get(
            `/EmpJob?$format=json&$select=userId,department,division,jobTitle,position,managerId,employeeClass,empRelationship,emplStatus,payGrade&$filter=managerId eq '${managerId}'`
        );
        return aEmpInfo;
    } catch (err) {
        req.reject(err);
    }
}

const fetchUsersInformation = async (req) => {
    try {
        console.log('running on the handler');
        var [usersPhoto, userDetails] = await Promise.all([fetchProfilePhoto(req), fetchUserDetails(req)]);
        if (Array.isArray(userDetails) && userDetails.length) {
            for (const user of userDetails) {
                usersPhoto.map((image) => {
                    if (user.userId == image?.userId) {
                        image.photo = image.photo ? ("data:image/jpeg;base64," + image.photo.replaceAll("\r\n", "")) : "";
                        user.photo = image.photo;
                    }
                })
            }
        }
        console.log(userDetails);
        return userDetails;
    } catch (oErr) {
        req.reject(oErr);
    }
};

const fetchUserDetails = async (req) => {
    try {
        const { userId } = req.data;
        const txecum = sfecum.transaction(req);
        const query = SELECT.from("User", ["userId", "username", "firstName", "defaultFullName", "email", "jobTitle", "cellPhone", "country",
            "addressLine1", "addressLine2", "addressLine3", "jobFamily", "jobLevel", "jobRole", "businessPhone"])
            .where({ userId: userId })
        let userDetails = await txecum.send({ method: "READ", query });
        console.log(userDetails);
        return userDetails;
    } catch (oErr) {
        req.error({
            code: 500,
            message: oErr,
            target: oErr,
            status: 500,
        });
    }
}

const fetchProfilePhoto = async (req) => {
    try {
        const { userId } = req.data;
        const txecfp = sfecfp.transaction(req);
        const query = SELECT.from("Photo", ["photo", "userId"])
            .where({ userId: userId, photoType: 1 })
        let usersPhoto = await txecfp.send({ method: "READ", query });
        return usersPhoto;
    } catch (oErr) {
        req.error({
            code: 500,
            message: oErr,
            target: oErr,
            status: 500,
        });
    }
};


module.exports = {
    usersInformation,
    fetchUsersInformation
}