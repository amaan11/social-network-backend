import Sequelize from "sequelize"
import sequelize from "../utils/database"

const userContact = sequelize.define('user_contact', {
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
    },
    birth_month: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    birth_year: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    birthday_visibility: {
        type: Sequelize.ENUM,
        values: ["none", "connections", "network", "all"],
        allowNull: false,
    }

})

export default userContact

