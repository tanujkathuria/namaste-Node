
# creating a new repo in the github 
echo "# dev-tinder-ui" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin https://github.com/tanujkathuria/dev-tinder-ui.git
git push -u origin master

# to make the login work along with the cors 
install cors in the back end node js api 
add the middleware to allow cors origin with origin and credentials true 
call the post api with withCredential:true