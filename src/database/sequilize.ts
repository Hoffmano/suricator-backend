import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('suricator', 'suricator', 'suricator', {
	host: 'database',
	dialect: 'postgres',
	logging: console.log,
})

sequelize.authenticate().then((value) => {
  console.log("Connected")
}).catch(reason => {
  console.log(reason)
})

sequelize.sync()

export default sequelize