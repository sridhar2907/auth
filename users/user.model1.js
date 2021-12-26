const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        role: { type: DataTypes.STRING, allowNull: false ,  primaryKey: true },
        getall: { type: DataTypes.STRING, allowNull: false },
        updateall: { type: DataTypes.STRING, allowNull: false },
        deleteall: { type: DataTypes.STRING, allowNull: false },
        getbyid: { type: DataTypes.STRING, allowNull: false },
        deviceinfo: { type: DataTypes.STRING, allowNull: false },
        updatedevice: { type: DataTypes.STRING, allowNull: false },
        
    };
    

    const options = {
        
        timestamps: false,
       
       
    }

    
    return sequelize.define('role_access', attributes,options);
}
