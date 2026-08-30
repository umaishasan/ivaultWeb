export const Queries = {
    USER_LIST: "SELECT * FROM [dbo].[Users];",
    LOGIN: "SELECT * FROM [dbo].[Users] WHERE Email = @email AND Password = @password;",
    SYS_HEALTH: "SELECT sh.Id, d.Type, sh.DeviceModel, sh.Bettry, sh.Temperature, sh.Status FROM SystemHealth sh INNER JOIN Device d ON sh.DeviceModel = d.Model;",
    ROLE: "SELECT Id, Name, Email, Family, Staff FROM RBAC r INNER JOIN Users u ON r.UserEmail = u.Email;",
    RBAC_LIST: "SELECT Name, Family, Staff FROM [dbo].[Rbac] r INNER JOIN Users u ON r.UserEmail = u.Email;"
}
