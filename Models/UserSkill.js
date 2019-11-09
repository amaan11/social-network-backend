import Sequelize from "sequelize"
import sequelize from "../utils/database"
import Skill from "./SKill";

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

const isSkillExist = async skillName => {
    let isExist = false
    let skillId = ''

    await Skill.findOne({
        where: {
            skill_name: skillName.toLowerCase()
        }
    })
        .then(response => {
            if (response) {
                isExist = true
                skillId = response.id
            }
        })
        .catch(error => {
            throw new Error(error)
        })
    return { isExist, skillId };
}

const storeSkill = async (userId, skillName) => {
    let statusCode = ''
    let response = {}

    const { isExist, skillId } = await isSkillExist(skillName)

    if (isExist && skillId) {
        await userSkill.create({
            user_id: userId,
            skill_id: skillId
        })
            .then(res => {
                statusCode = '200'
                response['isSuccess'] = true
                response['data'] = res
            })
            .catch(error => {
                statusCode = '500'
                response['isSuccess'] = false
                response['data'] = "Something Went Wrong!"
            });
    }
    else {
        statusCode = '500'
        response['isSuccess'] = false
        response['data'] = "Skill Does Not Exist"
    }
    return { statusCode, response }
}

export { storeSkill, userSkill }

