import { Model, DataTypes, } from 'sequelize';
export class Group extends Model {
    static associate(models) {
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
export function GroupFactory(sequelize) {
    Group.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        }
    }, {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'group'
    });
    return Group;
}
