import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'database',
  dialect: 'postgres',
  logging: console.log
})


sequelize.authenticate().then((value) => {
  console.log("Connected")
}).catch(reason => {
  console.log(reason)
})

sequelize.sync()

export default sequelize
