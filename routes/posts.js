const express = require('express');
const router = express.Router();

// TODO: Add your routes to the route here.
const PostsController = require('../controllers/PostsController.js');

/*
* NEW FORM
*/
router.get('/new', PostsController.post_form )
router.post('/new', PostsController.create);

/* Edit and PUT (update) */
router.get('/:id/edit', PostsController.edit_form )
router.put('/:id', PostsController.update )

/* GET LIST */
router.get('/', PostsController.list )

/* GET ONE */
router.get('/:id', PostsController.view )


/* DELETE  eradicate */
router.delete('/:id', PostsController.delete )

module.exports = router;
