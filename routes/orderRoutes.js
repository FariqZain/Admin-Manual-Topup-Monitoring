const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');

const router = express.Router();

// Helper generator nomor invoice unik
const generateInvoice = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `INV-${Date.now()}-${random}`;
};

// 1. CREATE: Tambah pesanan top-up baru
router.post('/', async (req, res) => {
  try {
    const { gameName, gameUserId, serverId, itemName, price, paymentMethod } = req.body;

    const newOrder = await Order.create({
      invoiceCode: generateInvoice(),
      gameName,
      gameUserId,
      serverId,
      itemName,
      price: Number(price),
      paymentMethod,
    });

    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 2. READ: Ambil semua pesanan (mendukung filter status & pencarian)
router.get('/', async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== 'ALL') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { invoiceCode: { $regex: search, $options: 'i' } },
        { gameUserId: { $regex: search, $options: 'i' } },
        { gameName: { $regex: search, $options: 'i' } },
      ];
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data pesanan' });
  }
});

// 3. UPDATE: Perbarui data atau status pesanan
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Format ID pesanan tidak valid' });
    }

    // Batasi hanya field yang diizinkan untuk diubah
    const allowedUpdates = {};
    const fields = ['gameName', 'gameUserId', 'serverId', 'itemName', 'price', 'paymentMethod', 'status'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        allowedUpdates[field] = field === 'price' ? Number(req.body[field]) : req.body[field];
      }
    });

    const updatedOrder = await Order.findByIdAndUpdate(id, allowedUpdates, {
      new: true,           // Kembalikan dokumen setelah diperbarui
      runValidators: true, // Validasi skema tetap berjalan saat Update
    });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Pesanan tidak ditemukan' });
    }

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 4. DELETE: Hapus pesanan berdasarkan ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Format ID pesanan tidak valid' });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: 'Pesanan tidak ditemukan' });
    }

    res.status(200).json({ success: true, message: 'Pesanan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
