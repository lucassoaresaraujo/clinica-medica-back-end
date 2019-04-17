var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = app => {
    app.set("port", 8000);
    app.set("json spaces", 4);
    app.use(cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200 
    }));
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        delete req.body.id;            
        next();
    });
}