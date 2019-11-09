import Sequelize from 'sequelize'
import sequelize from "../utils/database"

const userProfile = sequelize.define('user_profile', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: {
            args: true,
            msg: "User Id Already exists"
        }
    },
    cover_image: {
        type: Sequelize.BLOB,
        allowNull: true,
    },
    profile_image: {
        type: Sequelize.BLOB,
        allowNull: true,
    },
    former_name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    headline: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    position_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    is_visible_education: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    User_education_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    state: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    zip_code: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    industry_type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    contact_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

export default userProfile