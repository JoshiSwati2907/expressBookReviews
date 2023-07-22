const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let authenticatedUser = require("./auth_users.js").authenticatedUser;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios')


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!authenticatedUser(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.send(JSON.stringify(books,null,5));
});
const connectToURL = async(url)=>{
    const outcome = axios.get(url);
    let listofbooks = (await outcome).data;
    console.log(JSON.stringify(listofbooks));
}
//connectToURL('https://swatihim-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/');

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    isbn = req.params.isbn;
    const bookdet = Object.values(books);
    let bookwithisbn = bookdet.filter((user)=>{
        return(user.isbn === isbn)
      })
    if (bookwithisbn.length > 0)
      res.send(bookwithisbn);
    else
    res.send("Book doesnt exists")
      
 });
 const connecttoisbnNurl = (url)=>{
    const req = axios.get(url);
    console.log(req);
    req.then(resp => {
        let isbnbook = resp.data;
        
      })
    .catch(err => {
        console.log(err.toString())
    });
  }
  //console.log("Before connect URL")
  connecttoisbnNurl('https://swatihim-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/A123');
  //console.log("After connect URL")
  
  

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const bookdet = Object.values(books);
    let bookwithauthor = bookdet.filter((user)=>{
        return(user.author === author)
      })
    if (bookwithauthor.length > 0)
      res.send(bookwithauthor);
    else
    res.send("Book doesnt exists")
      
});
const connectToauthorURL = async(url)=>{   
    const outcome = axios.get(url);  
     let booksbyAuthor = (await outcome).data;
       console.log(JSON.stringify(booksbyAuthor));
   }
  // connectToauthorURL('https://swatihim-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/Chinua Achebe);
   

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const bookdet = Object.values(books);
  let bookwithauthor = bookdet.filter((user)=>{
      return(user.title === title)
    })
  if (bookwithauthor.length > 0)
    res.send(bookwithauthor);
  else
  res.send("Book doesnt exists")
});
const connectTotitleURL = async(url)=>{    const outcome = axios.get(url);  
    let booksbytitle = (await outcome).data;
      console.log(JSON.stringify(booksbytitle));
  }
  //connectTotitleURL('https://swatihim-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/Chinua Achebe);
  

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    isbn = req.params.isbn;
    const bookdet = Object.values(books);
    let bookwithisbn = bookdet.filter((user)=>{
        return(user.isbn === isbn)
      })
    if (bookwithisbn.length > 0)
    {
      res.send(bookwithisbn[0].reviews)
    }
    else
    res.send("Book doesnt exists")
});

module.exports.general = public_users;