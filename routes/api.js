/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const Book = require('../models/book');
module.exports = function (app) {

  app.route('/api/books')
    .get( async function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
     const books = await Book.find();
      
      res.send(books);
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
    
      const newBook = new Book ({
        title
      });
      newBook.save((err,data)=>{
        
        if(!data){
          
         res.send('missing required field title');
        }else {
         
          res.json({_id:newBook._id,title:newBook.title});
        }
      })
      
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      Book.deleteMany(err=>{
        if(!err){
          res.send("complete delete successful")
        }
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

      Book.findById(bookid,(err,data)=>{
        
          if(!data){
            res.send("no book exists");
        }else{
           res.send(data);
        }
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if(!comment){
         return res.send("missing required field comment");
      }
      Book.findByIdAndUpdate(bookid,{$push:{comments:comment},$inc:{commentcount:1}},{
  new: true},(err,data)=>{
         if(!data){
            res.send("no book exists");
        }else{
         
           res.send(data);
        }
      })
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      Book.findByIdAndDelete(bookid,(err,doc)=>{
        if(doc){
          res.send("delete successful");
        }else{
          res.send("no book exists");
        }
      })
    });
  
};
