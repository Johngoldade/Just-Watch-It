import { Optional, Model, DataTypes, Sequelize } from 'sequelize';

interface FavoriteAttributes {
    id: number;
    userId: number;
    movieId: number
    poster_path: string, 
    title: string, 
    overview: string, 
    release_date: string 
}

interface FavoriteCreationAttributes extends Optional<FavoriteAttributes, 'id'> { }

export class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes> {
    public id!: number
    public userId!: number
    public movieId!: number
    public poster_path!: string 
    public title!: string
    public overview!: string
    public release_date!: string 
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
            movieId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            poster_path: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            overview: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            release_date: {
                type: DataTypes.STRING,
                allowNull: false
            }
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