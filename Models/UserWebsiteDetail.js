import Sequelize from "sequelize"
import sequelize from "../utils/database"

const userWebsiteDetail = sequelize.define('user_website_detail', {
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
    website_type: {
        type: Sequelize.ENUM,
        values: ["Personal", "Company", "Blog", "RSS Feed", "Portfolio", "Other"],
        allowNull: false
    },
    website_url: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default userWebsiteDetail

