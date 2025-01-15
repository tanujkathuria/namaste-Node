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

GET /connections
GET / requests/received
GET /feed -> to get the profiles of the other users 


