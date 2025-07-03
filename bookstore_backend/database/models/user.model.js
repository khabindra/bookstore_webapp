// models/user.model.js
const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", // Model name
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50), // Max 50 characters for username
        allowNull: false,
        unique: true, // Ensures username is unique
        // Optional: Add validation for username length, characters, etc.
        // validate: {
        //   len: [3, 50], // Example: username must be between 3 and 50 characters
        //   isAlphanumeric: true, // Example: only letters and numbers
        // },
      },
      email: {
        type: DataTypes.STRING(100), // Max 100 characters for email
        allowNull: false,
        unique: true, // Ensures email is unique
        validate: {
          isEmail: true, // Validates email format (e.g., contains '@' and '.')
        },
      },
      password: {
        type: DataTypes.STRING(255), // Increased length to accommodate hashed passwords (e.g., bcrypt)
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "user"), // Enforces role to be either 'admin' or 'user'
        allowNull: false,
        defaultValue: "user", // Default role for new users
      },
    },
    {
      tableName: "users", // Explicitly sets the table name to 'users'
      timestamps: true, // Enables createdAt and updatedAt columns
      createdAt: "created_at", // Maps Sequelize's createdAt to 'created_at' column in DB
      updatedAt: "updated_at", // Maps Sequelize's updatedAt to 'updated_at' column in DB
      // Optional: Add more model options here if needed, e.g., hooks, scopes
    }
  );

  return User;
};

module.exports = userModel;
