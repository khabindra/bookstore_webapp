const bookModel = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "book",
    {
      bookName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookAuthor: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bookGenre: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "books", // Explicit table name
      timestamps: true, // Enables createdAt & updatedAt
    }
  );

  return Book;
};

module.exports = bookModel;
