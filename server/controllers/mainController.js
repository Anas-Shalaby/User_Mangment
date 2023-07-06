const User = require('../models/User');
const mongoose = require('mongoose');
/**
 * Main controller -- Homepage
 */

exports.homepage = async(req , res) => {
  const locals=  {
        title : "Home page",
        description : "Dashboard with node and mongoDB"
    };

    let perPage = 12 ;
    let page = req.query.page || 1;


    try {



      const users = await User.aggregate([
        {
          $sort : {updatedAt : -1},
        }
      ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

      const count = await User.count();
      
      const messages = await req.consumeFlash('info');

      res.render('index' , {
         locals ,
         messages , 
         users , 
         current : page,
         pages : Math.ceil(count / perPage),
        });
    } catch (error) {
      
    }



};

/**
 * GET / 
 * render add users page
 */


exports.addUsers = async (req, res) => {
    const locals = {
      title: "Add New Customer - NodeJs",
      description: "Free NodeJs User Management System",
    };
  
    res.render("customer/add", locals);
};
/**
 * GET / 
 * render about page
 */


exports.aboutpage = async (req, res) => {
    const locals = {
      title: "About",
      description: "Free NodeJs User Management System",
    };
  
    res.render("about", {locals});
};

/**
 * POST / 
 * add user 
 */

exports.addUsersData = async (req ,res) => {
  const newUser = new User({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    telephone : req.body.telephone,
    email : req.body.email,
    details : req.body.details,
  })

  try {

    await User.create(newUser);
    await req.flash('info', 'New user has been added.');
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }

}


/**
 * GET / 
 * view user data
 */

exports.viewUserData = async (req ,res) => {
  try {
    
    const user = await User.findById(req.params.id);

    res.render('customer/view' , {user});
    
  } catch (error) {
    console.log(error);
  }

}
/**
 * GET / 
 * view user data
 */

exports.editUserPage = async (req ,res) => {
  try {

    const user = await User.findById(req.params.id);

    res.render('customer/edit' , {user});

  } catch (error) {
    console.log(error);
  }

}
/**
 * PUT / 
 * view user data
 */

exports.editUserData = async (req ,res) => {
  try {
    await User.findByIdAndUpdate(req.params.id , {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      telephone: req.body.telephone,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now()
    });

    await req.flash('info' , 'User updated Successfully');
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }

}
/**
 * DELETE / 
 * delete user data
 */

exports.deleteUserData = async (req ,res) => {
  try {
    await User.findByIdAndDelete({_id : req.params.id});
    await req.flash('info' , 'User deleted Successfully');
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }

}
/**
 * POST / 
 * search user data
 */

exports.searchUser = async (req ,res) => {

  const locals = {
    title: "Search Customer Data",
    description: "Free NodeJs User Management System",
  };


  try {

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/'^a-zA-Z0-9'/g , '');

    const users = await User.find({
      $or : [
        {firstName : {$regex : new RegExp(searchNoSpecialChar , 'i')}},
        {lastName : {$regex : new RegExp(searchNoSpecialChar , 'i')}}
      ]
    })

    res.render('customer/search' , {users , locals});
  } catch (error) {
    console.log(error);
  }

}