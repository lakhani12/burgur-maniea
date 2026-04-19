import express from "express";
import expressAsyncHandler from "express-async-handler";
import DeliveryMan from "../models/deliveryMan.js";
import { isAuth, isAdmin } from "../utlis.js";

const deliveryManRouter = express.Router();

deliveryManRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const deliveryMen = await DeliveryMan.find({});
    res.send(deliveryMen);
}));

deliveryManRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const newDeliveryMan = new DeliveryMan({
        fullName: req.body.fullName,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
    });
    const createdDeliveryMan = await newDeliveryMan.save();
    res.status(201).send(createdDeliveryMan);
}));

deliveryManRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const deliveryManId = req.params.id;
    const deliveryMan = await DeliveryMan.findById(deliveryManId);
    if (deliveryMan) {
        deliveryMan.fullName = req.body.fullName || deliveryMan.fullName;
        deliveryMan.address = req.body.address || deliveryMan.address;
        deliveryMan.phoneNumber = req.body.phoneNumber || deliveryMan.phoneNumber;
        deliveryMan.email = req.body.email || deliveryMan.email;
        const updatedDeliveryMan = await deliveryMan.save();
        res.send(updatedDeliveryMan);
    } else {
        res.status(404).send({ message: 'Delivery Man Not Found' });
    }
}));

deliveryManRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const deliveryMan = await DeliveryMan.findById(req.params.id);
    if (deliveryMan) {
        const deletedDeliveryMan = await DeliveryMan.findByIdAndDelete(req.params.id);
        res.send({ message: 'Delivery Man Deleted', deliveryMan: deletedDeliveryMan });
    } else {
        res.status(404).send({ message: 'Delivery Man Not Found' });
    }
}));

export default deliveryManRouter;
