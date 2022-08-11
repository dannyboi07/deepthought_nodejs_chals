
function RequestLogger(req, res, next) {
    console.log('Method: ', req.method);
    console.log('Path: ', req.path);
    console.log('Body: ', req.body);
    console.log('-----------------');
    next();
};

const UnknownEndpoint = (req, res) =>  {
    res.status(404).json({ error: 'Unknown endpoint' });
};

module.exports = {
    RequestLogger,
    UnknownEndpoint
}