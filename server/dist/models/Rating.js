import { Model, DataTypes, } from 'sequelize';
export class Rating extends Model {
}
export function RatingFactory(sequelize) {
    Rating.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'ratings'
    });
}
