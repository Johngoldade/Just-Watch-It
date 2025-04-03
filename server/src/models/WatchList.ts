import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
    type ForeignKey,
} from 'sequelize';

import { Rating } from './Rating.js'

import { Movie } from './Movie.js'

export class WatchList extends Model<
    InferAttributes<WatchList>,
    InferCreationAttributes<WatchList>
> {
    declare id: CreationOptional<number>;
    declare priority: number;
    declare watched: boolean;
    declare rating: ForeignKey<Rating['id']>;
    declare movieId: ForeignKey<Movie['imdbID']>;
    declare groupRating: number;
}

export function WatchListFacotry(sequelize: Sequelize): typeof WatchList {
    WatchList.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            priority: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            watched: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            groupRating: {
                type: DataTypes.INTEGER,
                allowNull: true,
            }
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'watch lists'
        })

    return WatchList
};