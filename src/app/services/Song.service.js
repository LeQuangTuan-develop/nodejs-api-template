const { Song } = require('../models')
const elasticClient = require('../../configs/elastic-client')

class SongService {
    async createSong(data) {
        data.lyricRendered = JSON.stringify(data.lyricRendered)

        const newSong = new Song(data)
        const createSong = await newSong.save()

        await elasticClient.index({
            index: 'song',
            document: {
                ...createSong,
            },
        })

        return createSong
    }

    async getAllSongs() {
        return await Song.findAll()
    }

    async getDetail(id) {
        const song = await Song.findByPk(id)
        if (!song) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This song does not exist',
            )
        }
        return song
    }
}

module.exports = new SongService()
