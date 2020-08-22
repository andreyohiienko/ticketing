import mongoose from 'mongoose'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest } from '@aotickets/common'

const router = express.Router()

router.post(
  '/api/orders',
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({})
  },
)

export { router as newOrderRouter }
