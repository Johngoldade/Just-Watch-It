import sequelize from '../config/connection.js'
import { FavoriteFactory } from './Favorite.js'
import { UserFactory } from './User.js'
import { GroupFactory } from './Group.js'
import { RatingFactory } from './Rating.js'
import { WatchList } from './WatchList.js'

const Favorite = FavoriteFactory(sequelize)
const Rating = RatingFactory(sequelize)
const Group = GroupFactory(sequelize)
const User = UserFactory(sequelize)

User.hasMany(Favorite, {
    foreignKey: 'userID',
    as: 'favorites',
    onDelete: 'CASCADE',
})
User.hasMany(Rating, {
    foreignKey: 'userId',
    as: 'ratings',
    onDelete: 'CASCADE',
})
User.belongsToMany(Group, {
    through: 'NAME_OF_JUNCTION_TABLE', // Replace with actual junction table name
    foreignKey: 'userId',
    otherKey: 'groupId',
    as: 'groups',
    onDelete: 'CASCADE',
})

Group.belongsToMany(User, {
    through: 'NAME_OF_JUNCTION_TABLE', // Replace with actual junction table name
    foreignKey: 'groupId',
    otherKey: 'userId',
    as: 'users',
    onDelete: 'CASCADE',
})
Group.hasMany(WatchList, {
    foreignKey: 'groupId',
    as: 'watchLists',
    onDelete: 'CASCADE',
})

Favorite.belongsTo(User, {
    foreignKey: 'userID',
    as: 'user',
    onDelete: 'CASCADE',
})

Rating.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
})


export { User, Favorite, Group, Rating };
