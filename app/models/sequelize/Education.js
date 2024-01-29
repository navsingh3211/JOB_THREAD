import { sequelize, DataTypes } from "../../config/sequelize.js";

const Education = sequelize.define(
  "education",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    slug: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    education_order: {
      type: DataTypes.INTEGER,
    },
    education_scope: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    created_on: {
      type: DataTypes.DATE,
    },
    last_updated_on: {
      type: DataTypes.DATE,
    },
    deleted_on: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "education",
    timestamps: false,
  }
);
export default Education;
