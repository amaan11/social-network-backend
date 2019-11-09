import express from "express"
import { check, validationResult } from "express-validator"
import { storeSkill } from "../Models/UserSkill"

const router = express.Router()

router.post("/skills",
    [
        check('skillName', 'Skill Cannot Be Empty').not().isEmpty(),
    ], async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const { userId, skillName } = req.body
            const { statusCode, response } = await storeSkill(userId, skillName)
            return res.status(statusCode).json(response)
        }
        catch (error) { next(error) }
    })


export default router