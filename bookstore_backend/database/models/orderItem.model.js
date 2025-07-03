const orderItemModel = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      order_id: { type: DataTypes.INTEGER, allowNull: false },
      book_id: { type: DataTypes.INTEGER, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      price_at_purchase: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    },
    {
      tableName: "order_items",
      timestamps: false,
      indexes: [{ unique: true, fields: ["order_id", "book_id"] }],
    }
  );

  return OrderItem;
};
module.exports = orderItemModel;
