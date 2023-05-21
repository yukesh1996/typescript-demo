import { DataTypes } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';
import { AppModel } from '../util/model';

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName: 'users',
  indexes:[
    { fields: ['email'], unique:true },
  ]
})
export class UserModel extends AppModel {

  @Column({
    type: DataTypes.STRING,
  })
  public name!: string;

  @Column({
    type: DataTypes.STRING,
  })
  public email!: string;

  @Column({
    type: DataTypes.STRING,
  })
  public phone!: string;

  @Column({
    type: DataTypes.STRING,
  })
  public password!: string;

  @Column({
    type: DataTypes.BOOLEAN,
  })
  public isActive!: boolean;
}
