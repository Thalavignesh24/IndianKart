const jwt = require('jsonwebtoken');

const cloudinary = require('cloudinary').v2;

function Utils() {
    cloudinary.config({
        cloud_name: 'dfgwcxpwt',
        api_key: '522398794311441',
        api_secret: 'wKzgRXvueumjS31uJsW6FBazWyU',
        secure: true
    });

    this.verifyToken = async (req, res, next) => {
        const token = req.body.token || req.query.token;
        if (!token) {
            res.send("Token Required");
        } else {
            try {
                const auth = await jwt.verify(token, "SecretKey");
                // console.log(auth);
                if (auth) {
                    return next();
                }
            } catch (error) {
                console.log(error.message);
                res.send({
                    "Message": error.message
                });
            }
        }
    }
}

module.exports = new Utils();
