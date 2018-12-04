const bcrypt = require('bcryptjs')

function createUser(username, password, email, callback){
    const cryptPwd = bcrypt.hashSync(password, 10)
    global.db.collection("users").insert({ username, password: cryptPwd, email, isAdmin: false }, function(err, result){
        callback(err, result)
    })
}

function findAllUsers(callback) {
  global.db.collection("users").find().toArray(function (err, docs){
    if(err) return console.log(err)
    callback(docs)
  })
}

function deleteUser(email, callback){
  global.db.collection("users").deleteOne({email}, callback)
}

function findUser(email, callback){
  global.db.collection("users").findOne({email}, callback)
}

function changePassword(email, password){
  const cryptPwd = bcrypt.hashSync(password, 10)
  global.db.collection("users").updateOne({email}, {$set:{password: cryptPwd}})
}

module.exports = { createUser, findUser, findAllUsers, changePassword, deleteUser }
