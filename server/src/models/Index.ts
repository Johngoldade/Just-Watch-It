import sequelize from '../config/connection.js'
import { FavoriteFactory } from './Favorite.js'
import { UserFactory } from './User.js'


const Favorite = FavoriteFactory(sequelize)
const User = UserFactory(sequelize)


User.hasMany(Favorite, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
})

Favorite.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
})

export { User, Favorite };