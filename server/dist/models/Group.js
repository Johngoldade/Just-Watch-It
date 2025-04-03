import { Model, DataTypes, } from 'sequelize';
export class Group extends Model {
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
}
