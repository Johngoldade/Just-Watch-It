import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
    type ForeignKey,
} from 'sequelize';

import { User } from './User.js'

import { WatchList } from './WatchList.js'

export class Group extends Model<
    InferAttributes<Group>,
    InferCreationAttributes<Group>
> {
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;// Note: 'user' was changed to 'userId' for consistency
    declare watchList: ForeignKey<WatchList['id']>;

    static associate(models: any) {
        // Define association with User
        Group.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user', // Alias for the association
            onDelete: 'CASCADE', // Optional: define behavior on user deletion
        });

        // Define association with WatchList
        Group.belongsTo(models.WatchList, {
            foreignKey: 'watchList',
            as: 'watchList', // Alias for the association
            onDelete: 'CASCADE', // Optional: define behavior on watchlist deletion
        });
    }
}

export function GroupFactory(sequelize: Sequelize) {
    Group.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            }
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'group'
        }
    )

    return Group;
}