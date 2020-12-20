import { Router } from 'express'
import lyrics from './controllers/lyrics'
import songs from './controllers/songs'
import dictionary from './controllers/dictionary'

const routes = Router()

routes.get('/songs/:search_string', songs.search_songs)
routes.get('/lyrics/:id', lyrics.get_lyrics)
routes.get('/songs-by-difficulty/:difficulty', songs.songsByDifficulty)
routes.get('/translate/:word', dictionary.translate)

export default routes