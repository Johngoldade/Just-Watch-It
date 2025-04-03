import { Model, DataTypes, } from 'sequelize';
export class Favorite extends Model {
}
export function FavoriteFactory(sequelize) {
    Favorite.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'favorites'
    });
}
