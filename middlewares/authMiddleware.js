const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        // const token = req.headers['authorization'].split(" ")[0]; // Fixed missing semicolon
        // const token = req.headers.split('Bearer ')[2];
        const urlEncodedToken = req.headers.authorization.split(" ")[1] 
        token = decodeURIComponent(urlEncodedToken)
        console.log(token);
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(200).send({
                    message: 'Auth failed fklejfe;fn',
                    success: false
                });
            } else {
                req.body.userId = decode.id; // Fixed assignment syntax error, changed ":" to "="
                next(); // Corrected next function call syntax
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error in middleware", success: false });
    }
};
