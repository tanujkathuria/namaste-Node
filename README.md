# Namaste Node 

## All the APIs needed 

# authRouter 

POST / signup 
POST / login
POST / logout 

# profileRouter 

PATCH / profile/edit 
PATCH / profile/password
GET / profile/view

connectionRequestRouter 

# send request on the sender side 

Status : ignore, interested, accepted, rejected 
POST /request/send/interested/:userId
POST /request/send/ignored/:userId
/request/send/:status/:userId

# review requests on the receiver end 

/request/review/:status/:userId
POST /request/review/accepted/:requestId
POST /request/review/rejected/:requestId

# userRouter

GET /requests/received -> find all the requests received 
GET /connections -> find all the connections 
GET /feed -> to get the profiles of the other users / can accept or reject those users 

# pagination 

/feed?page=1&limit=10 -> first 10 users .skip(0) & .limit(10)
/feed?page=2&limit=10 -> 11 to 20 users .skip(10) & .limit(10)
/feed?page=3&limit=10 -> 21 to 30 users .skip(20) & .limit(10)

skip and limit functions can be used 

