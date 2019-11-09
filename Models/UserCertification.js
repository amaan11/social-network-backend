import Sequelize from "sequelize"
import sequelize from "../utils/database"

const userCertification = sequelize.define('user_certifications', {
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
    certification_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    issuing_org_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    is_expired: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    issued_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    expired_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    credential_id: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    credential_url: {
        type: Sequelize.STRING,
        allowNull: false,
    },

})

export default userCertification

