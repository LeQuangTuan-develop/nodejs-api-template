const express = require('express')
const { route } = require('express/lib/router')
const router = express.Router()
const passport = require('passport')
const SongController = require('../app/controllers/Song.controller')
const validate = require('../app/middlewares/validate')
const { createSongSchema } = require('../app/validations/song.validation')

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validate(createSongSchema),
    SongController.create
)

router.get('/search', SongController.searchSong)

router.get('/', SongController.index)
router.get('/:id', SongController.getDetail)

router.put(
    '/pending/:id',
    passport.authenticate('jwt', { session: false }),
    SongController.updatePending
)
router.put(
    '/publish/:id',
    passport.authenticate('jwt', { session: false }),
    SongController.updatePublish
)
router.put(
    '/refuse/:id',
    passport.authenticate('jwt', { session: false }),
    SongController.updateRefuse
)
router.put(
    '/hide/:id',
    passport.authenticate('jwt', { session: false }),
    SongController.updateHide
)

module.exports = router
