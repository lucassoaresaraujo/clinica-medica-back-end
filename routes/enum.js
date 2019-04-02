module.exports = app => {    
    const Enum = app.db.models.enum;

    app.route("/enum")        
        .get((req, res) => {
            Enum.findAll({where: req.query})
                .then(enuns => {
                    res.json({enum_list: enuns});
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        .post((req, res) => {
            Enum.create(req.body)
                .then(result => {
                    res.status(201).json(result);
                })
                .catch(error => {
                    res.status(412).json({msg: error.message})
                });
        });
    
    app.route("/enum/:id")
        .get((req, res) => {            
            Enum.findOne({where: req.params})
                .then(result => {
                    if (result){
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }                    
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });                
        })
        .put((req, res) => {
            Enum.update(req.body, {where: req.params})
                .then(result => {
                    console.log(req.body);
                    res.sendStatus(204);
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        .delete((req, res) => {
            Enum.destroy({where: req.params})
                .then(result => {
                    res.sendStatus(204);
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

}