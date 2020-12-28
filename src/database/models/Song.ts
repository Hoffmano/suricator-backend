import DataType from 'sequelize'
import sequelize from '../sequilize'

const Song = sequelize.define(
	'Song',
	{
		title: {
			type: DataType.STRING,
			allowNull: false,
		},
		artist: {
			type: DataType.STRING,
			allowNull: false,
		},
		lyrics: {
			type: DataType.TEXT,
			allowNull: false,
		},
		album_cover: {
			type: DataType.STRING,
			allowNull: true,
		},
		difficulty: {
			type: DataType.INTEGER,
			allowNull: false,
		},
		views: {
			type: DataType.INTEGER,
			allowNull: false,
			defaultValue: 0,
		}
	},
	{
		freezeTableName: true,
	},
)
