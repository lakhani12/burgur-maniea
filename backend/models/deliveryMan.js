import mongoose from 'mongoose';

const deliveryManSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const DeliveryMan = mongoose.model('DeliveryMan', deliveryManSchema);
export default DeliveryMan;
