import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'

it('should return an error if the ticket does not exist', async () => {
  const ticketId = mongoose.Types.ObjectId()

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId })
    .expect(404)
})

it('should return an error if the ticket is already reserved', async () => {})

it('should reserve a ticket', async () => {})
