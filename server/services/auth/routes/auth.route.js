import {Router} from 'express'
import { login, logOut } from '../controllers/auth.contoller.js';

const router = Router()

router.post("/auth/login", login)
router.get("/auth/logout", logOut)





export default router
