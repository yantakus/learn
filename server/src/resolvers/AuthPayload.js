const AuthPayload = {
  currentUser: async ({ currentUser: { id } }, args, ctx, info) => {
    return ctx.db.query.user({ where: { id } }, info)
  },
}

module.exports = { AuthPayload }
