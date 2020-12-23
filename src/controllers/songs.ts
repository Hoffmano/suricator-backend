import { Request, Response } from 'express'
import { searchSongs, songsByDifficulty } from '../models/songs'
import { Song } from '../@types/song'
import views from '../views/render'

export default {
	async searchSongs(request: Request, response: Response) {
		const  searchString  = request.params.searchString
		const songs = await searchSongs(searchString).catch((error) => {
			console.log(`error: ${error}`)
		})
		return response.json(views.renderManySongs(songs as Song[]))
	},

	async songsByDifficulty(request: Request, response: Response) {
		const { difficulty } = request.params
		const songs = await songsByDifficulty(difficulty)
		return response.json(views.renderSongsByDifficulty(songs))
	},
}
