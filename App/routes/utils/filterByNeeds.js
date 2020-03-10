const User = require('../../models/user')

module.exports = async (req)=>{
    console.log(req.user)
    const dbFiltered = req.user.gender_preference === 'both' 
        ?   await User.find({})
                .where('age').gte(req.user.minAge).lte(req.user.maxAge)
                .where('minAge').lte(req.user.age)
                .where('maxAge').gte(req.user.age)
        :   await User.find({})
                .where('gender').equals(req.user.gender_preference)
                .where('age').gte(req.user.minAge).lte(req.user.maxAge)
                .where('minAge').lte(req.user.age)
                .where('maxAge').gte(req.user.age)

    return dbFiltered
        .filter(user=>{
            return !req.user.seen.some(seen=>seen.userId.equals(user._id)) && !req.user._id.equals(user._id)
        })
}