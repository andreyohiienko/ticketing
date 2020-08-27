import express, { Request, Response } from 'express'
import { requireAuth, validateRequest } from '@aotickets/common'
import { body } from 'express-validator'

const router = express.Router()

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  (req: Request, res: Response) => {
    res.send({ success: true })
  },
)

export { router as createChargeRouter }
