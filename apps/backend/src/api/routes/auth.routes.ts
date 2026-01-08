import { Hono } from 'hono'
import * as authController from '../controllers/auth.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const auth = new Hono()

auth.post('/sign-up', authController.signUp)
auth.post('/sign-in', authController.signIn)

auth.get('/session', authMiddleware, authController.session)
auth.post('/logout', authMiddleware, authController.logout)

export default auth
