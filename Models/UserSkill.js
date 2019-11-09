import Sequelize from "sequelize"
import sequelize from "../utils/database"

const userSkill = sequelize.define('user_skills', {
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
    skill_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})

export default userSkill

