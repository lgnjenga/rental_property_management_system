const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');

// @route      POST api/auth
// @desc       Get logged in User
// @access     Private
router.get('/', auth, async (req, res) => {
    // res.send('Get Logged in User');
    try {
        // const user = await User.findById(req.user.id).select('-password'); // Find user by Id
        const users = await User.find(); // Find all users
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route      GET api/auth/:id
// @desc       Get User by ID
// @access     Private
router.get('/:id', auth, async (req, res) => {
    // Get user by ID
    try {
      const user = await User.findById(req.params.id).select('-password'); // Find user by ID and exclude password
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.status(500).send('Server Error');
    }
  });

// @route      POST api/auth
// @desc       Auth User and get Token
// @access     Public
router.post('/', 
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ], 
    async (req, res) => {
        // res.send('Log in User');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const payload = {
                        user: {
                          id: user.id
                        }
                      };
                    
            jwt.sign(payload,
                        config.get('jwtSecret'),
                        { expiresIn: 360000 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({ token });
                        }
                    );

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;