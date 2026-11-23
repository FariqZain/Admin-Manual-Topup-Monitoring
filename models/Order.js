const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    invoiceCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    gameName: {
      type: String,
      required: [true, 'Nama game wajib diisi'],
      trim: true,
    },
    gameUserId: {
      type: String,
      required: [true, 'User ID game wajib diisi'],
      trim: true,
    },
    serverId: {
      type: String,
      default: '',
      trim: true,
    },
    itemName: {
      type: String,
      required: [true, 'Nama paket item wajib diisi'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Harga wajib diisi'],
      min: [1000, 'Harga minimal Rp 1.000'],
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['QRIS', 'GoPay', 'OVO', 'DANA', 'Transfer Bank'],
      default: 'QRIS',
    },
    status: {
      type: String,
      enum: ['PENDING', 'PROCESS', 'SUCCESS', 'FAILED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

// Indeks untuk mempercepat filter status dan pengurutan transaksi terbaru
orderSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);
