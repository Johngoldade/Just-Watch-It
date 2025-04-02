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

export class Rating extends Model<
    InferAttributes<Rating>,
    InferCreationAttributes<Rating>
> {
    declare id: CreationOptional<number>;
    declare rating: number;
    declare user: ForeignKey<User['id']>;
    declare Movie: ForeignKey<Movie['id']>
}

export function RatingFactory(sequelize: Sequelize) {
    Rating.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            rating:{
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'ratings'
        }
    )
}