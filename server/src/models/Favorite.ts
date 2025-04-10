import {Optional, Model, DataTypes, Sequelize } from 'sequelize';

interface FavoriteAttributes {
    id: number;
    userId: number;
  }

interface FavoriteCreationAttributes extends Optional<FavoriteAttributes, 'id'> {}

export class Favorite extends Model<FavoriteAttributes,FavoriteCreationAttributes> {
    public id!: number
    public userId!: number
}

export function FavoriteFactory(sequelize: Sequelize): typeof Favorite {
    Favorite.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'favorites',
            tableName: 'favorites'
        }
    )

    return Favorite;
}