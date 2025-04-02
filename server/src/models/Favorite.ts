import {
    CreationOptional,
    ForeignKey,
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    DataTypes,
    type Sequelize,
} from 'sequelize';

import { User } from './User.js'

export class Favorite extends Model<
    InferAttributes<Favorite>,
    InferCreationAttributes<Favorite>
> {
    declare id: CreationOptional<number>;
    declare userID: ForeignKey<User['id']>;
    declare movieId: ForeignKey<Movie['id']>;
}

export function FavoriteFactory(sequelize: Sequelize) {
    Favorite.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'favorites'
        }
    )
}