const jwt = require('jsonwebtoken');
const { appConfig } = require('../config.js');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, appConfig.token);
		const userId = decodedToken.userId;
		if (req.body.userId && req.body.userId !== userId) {
			throw 'User ID non valable !';
		} else {
			req.userId = userId;
			next();
		}
	} catch (error) {
		res.status(401).json({
			error: error | 'Requête non authentifiée !'
		});
	}
};