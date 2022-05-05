const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
//Først henter jeg bcrypt, da jeg bruger det igennem alle mine koder
//så henter jeg pakken med passport-local via Localstrategy, dette bruger jeg 
/*
I denne sektion får jeg ordnet at man skal indtaste den rette email og det rette password
for at logge ind, gøres dette ikke, vil man få returneret nogle beskeder, som siger der er sket en fejl
som det ses i koden, opretter jeg en variabel som tjekker ligheden imellem de indtastede passwords og
emails. Hertil kalder jeg på "user" som også ligger i min server.js
*/
function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if(user == null){
            return done(null, false, {message: 'Der findes ikke en bruger som har denne e-mail!'})
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else{
                return done(null, false,{message: 'Der findes ikke en bruger med dette kodeord!'})
            }
        } catch (e){
            return done(e)
        }
    } 
    passport.use(new LocalStrategy({usernameField:'email'},authenticateUser))
    passport.serializeUser((user,done) => done (null, user.id))
    passport.deserializeUser((id,done) => { 
        return done (null, getUserById(id))
    })
}
module.exports = initialize 