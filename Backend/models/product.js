import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, trim: true },
    status: { type: String, enum: ['Disponible', 'Agotado'], default: 'Disponible' },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
