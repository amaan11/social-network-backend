import Sequelize from "sequelize"
import sequelize from "../utils/database"

const userVolunteerExperience = sequelize.define('user_volunteer_experience', {
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
    organization_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    is_currently_volunteering: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

export default userVolunteerExperience

