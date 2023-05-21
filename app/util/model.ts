import { DataTypes, Sequelize } from 'sequelize';
import { Column, Model } from 'sequelize-typescript';

export class AppModel extends Model {

  @Column({
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  public id!: number;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
  })
  public readonly createdAt!: Date;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
  })
  public readonly updatedAt!: Date;

  @Column({
    type: DataTypes.DATE,
  })
  public readonly deletedAt!: Date;

}
