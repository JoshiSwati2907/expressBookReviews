const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username, password)=>{ //returns boolean
//write code to check is the username is valid
let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }

}

const authenticatedUser = (username)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (isValid(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60*3 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
 
 const username = req.authorization.session.username;
 const isbn = req.params.isbn;
 const review =req.query.review;
 const bookdet = Object.values(books);
 let bookwithisbn = bookdet.filter((user)=>{
        return(user.isbn === isbn)
      })
      bookwithisbn[0].reviews[username] = review
      res.send("review (" + review + ") for isbn" + isbn + "by user " + username + "added");
});
// Delete a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
   
   const username = req.authorization.session.username;
   const isbn = req.params.isbn;
   const bookdet = Object.values(books);
   let bookwithisbn = bookdet.filter((user)=>{
          return(user.isbn === isbn)
        })
       delete bookwithisbn[0].reviews[username];
        res.send("review " +  "for isbn" + isbn + "by user " + username + "added");
  });
module.exports.authenticated = regd_users;
module.exports.authenticatedUser= authenticatedUser;
module.exports.isValid = isValid;
module.exports.users = users;