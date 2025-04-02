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

export class WatchList extends Model<
    InferAttributes<WatchList>,
    InferCreationAttributes<WatchList>
> {
    declare id: CreationOptional<number>;
    declare priority: number;
    declare watched: boolean;
    declare rating: ForeignKey<Rating['id']>;
    declare movieId: ForeignKey<Movie['id']>;
    declare groupRating: number;
}