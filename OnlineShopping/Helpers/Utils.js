const cloudinary = require('cloudinary').v2;
function Utils() {
    cloudinary.config({
        cloud_name: 'dfgwcxpwt',
        api_key: '522398794311441',
        api_secret: 'wKzgRXvueumjS31uJsW6FBazWyU',
        secure: true
    });
}

module.exports = new Utils();
