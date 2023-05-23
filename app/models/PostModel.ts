import { DataTypes } from 'sequelize';
import { Column, Table, ForeignKey } from 'sequelize-typescript';
import { AppModel } from '../util/model';
import { UserModel } from './UserModel';

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName: 'posts',
  indexes:[
    { fields: ['title'], unique:true },
  ]
})
export class PostModel extends AppModel {

  @Column({
    type: DataTypes.STRING,
  })
  public title!: string;

  @Column({
    type: DataTypes.STRING,
  })
  public description!: string;

  @Column({
    type: DataTypes.BIGINT,
  })
  public createdBy!: number;
  @ForeignKey(() => UserModel)

  @Column({
    type: DataTypes.BOOLEAN,
  })
  public isActive!: boolean;
}
