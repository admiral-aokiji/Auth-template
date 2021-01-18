const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user')

require('../config/passport')(passport);

router.post('/register', (req, res) => {
    const { firstName, lastName, email, gender, password, password2 } = req.body;
    // the above arguments should match the NAME attribute in form
    
    let errors = [];
    if (!firstName || !lastName || !email || !password || !password2 || !gender) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('home', {
            errors,
            firstName,
            lastName,
            email,
            gender,
            password,
            password2
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('home', {
                    errors,
                    firstName,
                    lastName,
                    email,
                    gender
                    // try this case after successful login
                });
            } else {

                const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    password,
                    gender
                    // the above argument requires the NAME attributes to match password name set in USERS object
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                passport.authenticate("local")(req, res, () => {
                                    res.redirect('/u')
                                    console.log("New User added")
                                })
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});
router.post('/login', (req, res, next) => {
    // Try to pass local user Name to path name.
    passport.authenticate('local', {
        successRedirect: '/u',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next)
});
// BUG --- After logging in, the user can go back to /user/login, enter a different password and get "logged in" again
// Redirect on pressing back button of browser

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});

// ----------------------------------------------------------------------------------
// SHOW - Profile
router.get('/:id/profile', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if (err) {
            console.log(err)
            res.redirect('/u')
        } else {
            res.render('user-profile', { user: foundUser })
        }
    })
})

// EDIT - Security
router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if (err) {
            console.log(err)
            res.redirect('/u')
        } else {
            res.render('user-security', { user: foundUser })
        }
    })
})

// UPDATE --User credentials change
router.put('/:id', (req, res) => {
    // User.findByIdAndUpdate(req.params.id, req.body.email, (err, foundUser) => {
    //     if (foundUser.email === req.body.email) {
    //         res.redirect('/u/:id/edit')
    //         req.flash("ERROR- emails flash")
    //     }
        //     if (err) {
        //         console.log(err)
        //         res.redirect('/u/:id/edit')
        //     } else {
        //         req.logout();
        //         req.flash('success_msg', 'Email id changed. Please login again.');
        //         // check this
        //         res.redirect('/');
        //     }
        // })
        res.redirect("/u/home")
    })
    module.exports = router;
