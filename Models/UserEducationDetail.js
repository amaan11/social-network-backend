import Sequelize from "sequelize"
import sequelize from "../utils/database"

const userEducationDetail = sequelize.define('user_education_detail', {
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
    school: {
        type: Sequelize.STRING,
        allowNull: false
    },
    degree: {
        type: Sequelize.STRING,
        allowNull: false
    },
    field_of_study: {
        type: Sequelize.STRING,
        allowNull: false
    },
    start_year: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    end_year: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    activities: {
        type: Sequelize.STRING,
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

export default userEducationDetail

