import { Model, DataTypes, } from 'sequelize';
export class WatchList extends Model {
}
export function WatchListFacotry(sequelize) {
    WatchList.init({
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
    }, {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'watch lists'
    });
    return WatchList;
}
;
