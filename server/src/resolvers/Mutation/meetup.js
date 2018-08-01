const { getUserId } = require('../../utils')

const meetup = {
  async createMeetup (
    parent,
    { title, description, date, location },
    ctx,
    info
  ) {
    const userId = getUserId(ctx)
    return ctx.db.mutation.createMeetup(
      {
        data: {
          title,
          description,
          date,
          location,
          organizer: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    )
  },
  async attendMeetup (parent, { id, attending }, ctx, info) {
    const userId = getUserId(ctx)
    const meetupExists = await ctx.db.exists.Meetup({
      id
    })
    if (!meetupExists) {
      throw new Error('Sorry, meetup not found!')
    }
    return ctx.db.mutation.updateMeetup(
      {
        where: {
          id
        },
        data: {
          attendees: {
            [Boolean(attending) ? 'connect' : 'disconnect']: {
              id: userId
            }
          }
        }
      },
      info
    )
  },
}

module.exports = { meetup }
