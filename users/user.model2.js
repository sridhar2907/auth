const { DataTypes } = require('sequelize');


module.exports = model;

function model(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        licensekey: { type: DataTypes.STRING, allowNull: true ,  primaryKey: true},
        deviceid: { type: DataTypes.STRING, allowNull: false },
        active: { type: DataTypes.STRING, allowNull: false }
        
    };
    

    const options = {
        
        timestamps: false,
       
       
    }

    
    return sequelize.define('device_info', attributes,options);
}
