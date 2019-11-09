import Sequelize from "sequelize"
import sequelize from "../utils/database"

const userInstantMessenger = sequelize.define('user_instant_messenger', {
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
    },
    instant_messenger_type: {
        type: Sequelize.ENUM,
        values: ["Skype", "ICQ", "Google Hangouts", "QQ", "WeChat"],
        allowNull: false
    },
    instant_messenger_url: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default userInstantMessenger

