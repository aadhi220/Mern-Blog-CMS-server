const subscribeDb = require('../Models/SubscribeSchema');

exports.getAllSubscribers = async (req,res) => {
    try {
        const subscribers = await subscribeDb.find();
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
