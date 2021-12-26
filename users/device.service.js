const pool = require("../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
          
           
            `insert into licensekey(email,licensekeys,clientname,appname ) 
                      values(?,?,?,?)`,
                      
            [
              data.email,
              data.licensekeys,
              data.clientname,
              data.appname,
               
            ],
           
      
  
      (error, results, fields) => {
        if (error) {
          callBack(error);
      }
      return callBack(null, results);
        }
              
            
          );
    },
    updateUser: (data, callBack) => {
        pool.query(
          `update licensekey set deviceid=?, active=? where licensekeys = ?`,
          [
            data.deviceid,
            data.active,
            data.licensekeys
            
            
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      }
};