import { Model, DataTypes, } from 'sequelize';
import { Favorite } from './Favorite.js';
export class User extends Model {
}
export function UserFactory(sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        favorites: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Favorite,
                key: 'id'
            }
        },
        primaryGroup: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: User,
                key: 'id'
            }
        }
    }, {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'users'
    });
    return User;
}
