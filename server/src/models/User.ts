import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> {
    public id!: number
    public email!: string
    public username!: string
    public password!: string

    public async setPassword(password: string) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);
    }
}

export function UserFactory(sequelize: Sequelize): typeof User {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'users',
            tableName: 'users',
            hooks: {
                beforeCreate: async (user: any) => {
                    if (user.password) {
                        const saltRounds = 10;
                        user.password = await bcrypt.hash(user.password, saltRounds);
                    }
                }
            }
        }

    )

    return User;
}
