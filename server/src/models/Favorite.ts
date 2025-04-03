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
import { Movie } from './Movie.js';

export class Favorite extends Model<
    InferAttributes<Favorite>,
    InferCreationAttributes<Favorite>
> {
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;// Note: 'userID' was changed to 'userId' for consistency
    declare movieId: ForeignKey<Movie['imdbID']>;
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

    return Favorite;
}