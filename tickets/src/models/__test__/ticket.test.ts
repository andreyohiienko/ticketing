import { Ticket } from '../ticket'

it('should implement oprimistic concurrency control', async (done) => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  })

  // Save the ticket to the database
  await ticket.save()

  // fetch the ticket twice
  const firstInsatance = await Ticket.findById(ticket.id)
  const secondInsatance = await Ticket.findById(ticket.id)

  // make two separate changes to teh tickets we fetched
  firstInsatance!.set({ price: 10 })
  secondInsatance!.set({ price: 15 })

  // save the first fetched ticket
  await firstInsatance!.save()

  // save the second fetched ticket
  try {
    await secondInsatance!.save()
  } catch (error) {
    return done()
  }

  throw new Error('Should not reach this point')
})
