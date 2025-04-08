import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
    type ForeignKey,
} from 'sequelize';

import { Favorite } from './Favorite.js'
import { Group } from './Group.js';

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare username: string;
    declare password: string;
    declare favorites: ForeignKey<Favorite['id']>
    declare primaryGroup: ForeignKey<Group['id']>
}

export function UserFactory(sequelize: Sequelize){
    User.init(
        {
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
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'users'
        }

    )

    return User;
}
