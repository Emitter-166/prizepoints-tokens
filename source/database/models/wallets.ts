import { Sequelize, DataTypes } from "sequelize";



const model = (sequelize:Sequelize) =>{
        return sequelize.define("wallets", {
            userId:{
                type: DataTypes.CHAR(25),
                unique: true
            },

            wallet:{
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
        })
}

module.exports = model; 