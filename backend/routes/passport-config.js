const LocalStrategy = require('passport-local').Strategy


function initialize(passport, getUserByName, getUserById) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByName(username)
        if (user == null || user.password != password) {
            return done(null, false, { message: 'No user with that name' })
        } else {
            return done(null, user)
        }

    }

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}



module.exports = initialize
