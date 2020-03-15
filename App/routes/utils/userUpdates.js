const User = require('../../models/user')

const updateUsersStatus =async(req, currentMatchingUser, socket)=>{
    const {user} = req
    const getUpToDateMatchingUser = await User.findById(currentMatchingUser)
    
    const statusChecker = ()=>{
        if(getUpToDateMatchingUser.acceptedList.find(user=>user.userId.equals(req.user._id))){
            socket.emit('you got a match', currentMatchingUser)
            return 'accepted'
        }else if(getUpToDateMatchingUser.deniedList.find(user=>user.userId.equals(req.user._id))){
            return 'denied'
        }else{
            return 'pending'
        }
    }

    user.seen = user.seen.concat({
        userId: currentMatchingUser._id,
        status: statusChecker()
    })
    user.acceptedList = user.acceptedList.concat({
        userId: currentMatchingUser._id
    })
    try{
        await user.save()
    }catch(e){
        console.log('updateUsersStatus-----------Something went wrong', e)
    }
}

const updateUserDenied =async (req, currentMatchingUser)=>{
    const {user} = req
    user.seen = user.seen.concat({
        userId: currentMatchingUser._id,
        status: 'denied'
    })
    user.deniedList = user.deniedList.concat({
        userId: currentMatchingUser._id
    }) 
    try{
        await user.save()
    }catch(e){
        console.log('updateUserDenied-----------Something went wrong', e)
    }
}

const updateMatchingUser = async (req, currentMatchingUser, status)=>{
    const matchingUser = await User.findById(currentMatchingUser._id)
    const indexSeen = matchingUser.seen.findIndex(seen=>seen.userId.equals(req.user._id))
    console.log(matchingUser)
    console.log(indexSeen)
    console.log(matchingUser.seen[indexSeen])
    if(indexSeen>=0){
        if(matchingUser.seen[indexSeen].status === 'denied'){
            return
        }
        console.log(status)
        matchingUser.seen[indexSeen].status = status
        console.log(matchingUser.seen[indexSeen])
        try{
            console.log('------------saving----------')
            matchingUser.save()
            console.log('------------saved------------')
        }catch(e){
            console.log('updateMatchingUser-----------Something went wrong', e)
        }
    }
    console.log('--------------------------------------end')
}

module.exports ={
    updateUsersStatus,
    updateUserDenied,
    updateMatchingUser
}