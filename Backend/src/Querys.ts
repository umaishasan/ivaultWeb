export const Queries = {
    LOGIN: "SELECT Name, Email FROM [dbo].[Admin] WHERE Email = @email AND Password = @password;",
    ADMIN_DATA: "SELECT Id, Name, Email FROM [dbo].[Admin];",
    SYS_HEALTH: "SELECT sh.Id, d.Type, sh.DeviceModel, sh.Bettry, sh.Temperature, sh.Status FROM SystemHealth sh INNER JOIN Device d ON sh.DeviceModel = d.Model;",
    RBAC_LIST: "SELECT r.Id, u.Name, r.UserEmail, r.Family, r.Staff FROM [dbo].[Rbac] r INNER JOIN Users u ON r.UserEmail = u.Email;",
    SERVER_AVAILABILITY: "SELECT [Server],[Status],[Id] FROM [iVault].[dbo].[ServerData]",
    USER_DATA:"SELECT u.Name, u.Email, d.Type, dp.PaymentInfo FROM [iVault].[dbo].[DevicePurchase] dp INNER JOIN [iVault].[dbo].[Users] u ON dp.CustomerId = u.Email INNER JOIN [iVault].[dbo].[Device] d ON dp.DevicesId = d.Model;",
    DEVICE_CONNECTION:"SELECT dc.Id, d.Type, d.Model, dc.Connectivity FROM [iVault].[dbo].[Device] d INNER JOIN [iVault].[dbo].[DeviceConnection] dc ON dc.DeviceId = d.Model;",
    RBAC_UPDATE: "UPDATE [dbo].[Rbac] SET Family = @family, Staff = @staff WHERE Id = @id;",
}
