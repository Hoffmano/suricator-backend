import { Router } from 'express'
import lyrics from './controllers/lyrics'
import songs from './controllers/songs'
import dictionary from './controllers/dictionary'

const routes = Router()

routes.get('/songs/:searchString', songs.searchSongs)
routes.get('/lyrics/:id', lyrics.getLyrics)
routes.get('/songs-by-difficulty/:difficulty', songs.songsByDifficulty)
routes.get('/translate/:word', dictionary.translate)

export default routes