const orderModel = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      shipping_address: { type: DataTypes.JSONB, allowNull: false },
      payment_status: {
        type: DataTypes.ENUM("pending", "paid", "failed"),
        defaultValue: "pending",
      },
      delivery_status: {
        type: DataTypes.ENUM(
          "pending",
          "processing",
          "shipped",
          "delivered",
          "rejected"
        ),
        defaultValue: "pending",
      },
      order_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      delivered_date: { type: DataTypes.DATE, allowNull: true },
    },
    {
      tableName: "orders",
      timestamps: false,
    }
  );

  return Order;
};
module.exports = orderModel;
