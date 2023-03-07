const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');
const otpGenerator = require('otp-generator');

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

    this.uuid = () => uuidv4();

    this.otp = () => {
        return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    }
}

module.exports = new Utils();
