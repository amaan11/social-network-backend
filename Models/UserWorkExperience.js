import Sequelize from "sequelize"
import sequelize from "../utils/database"

const UserWorkExperience = sequelize.define('user_work_experience', {
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
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    employment_type: {
        type: Sequelize.ENUM,
        values: ["Full-time", "Part-time", "Self-employed", "Freelance", "Contract", "Internship", "Apprenticeship"],
        allowNull: false
    },
    company_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    is_currently_working: {
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
    file_path: {
        type: Sequelize.STRING,
        allowNull: false
    },
    external_link: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

export default UserWorkExperience

