import Sequelize from "sequelize"
import sequelize from "../utils/database"

const Skill = sequelize.define('skills', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    skill_name: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: false,
    },
})

export default Skill

