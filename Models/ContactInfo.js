import Sequelize from "sequelize"
import sequelize from "../utils/database"

const contactInfo = sequelize.define('contact_info', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
        unique: {
            args: true,
            msg: "User Id Already exists"
        }
    },
    contact_number: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    contact_type: {
        type: Sequelize.ENUM,
        values: ["Home", "Work", "Mobile"],
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default contactInfo

