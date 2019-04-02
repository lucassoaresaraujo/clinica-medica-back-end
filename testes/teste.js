module.exports = app => {    
    const Fornecedor = app.db.models.fornecedor;
    const Enum = app.db.models.enum;
    const Telefone = app.db.models.telefone;

    // Enum.findByPk(1)
    // .then( pj => {
    //     criarFornecedor(pj);
    // });

    // const criarFornecedor = pj => {
    //     Fornecedor.create({
    //         razaoSocial: "Teste 5",
    //         nome: "Teste 5",            
    //         telefones: []    
    //     }, {
    //         include: [Telefone]
    //     })
    //     .then(fornecedor => {
    //         fornecedor.setPersonalidadeJuridica(pj, {save: false});
    //         return fornecedor.save();
    //     });
    // }

    // const criarFornecedores = listaEnuns => {        
    //     Fornecedor.create({
    //         razao_social: "Teste",
    //         nome: "Teste",
    //         personalidade_juridica_id: listaEnuns[0].get().id
    //     })
    //     .then(salvo => {
    //         escreverFornecedor(salvo);
    //     });

    // }

    // const escreverFornecedor = (fornecedor) =>  {
    //         console.log(fornecedor.nome);
    // };

    // Enum.findById(1)
    // .then(itemEnum => {

    // });
    
    // const criarFornecedor = itemEnum => {
    //     Fornecedor.build()
    // }


    // const enuns = Enum.findAll({where: {type: 'telefone.tipo'}});
    // const fornecedor = Fornecedor.findAll({where: {id: 69}});

    // Promise.all([enuns, fornecedor])
    //     .then(result => {
    //         const personalidade = result[0][0];
    //         const fornecedor = result[1][0];            
    //         return inserirPersonalidadeJuridica(fornecedor, personalidade);
    //     })
    //     .then(()=>{
    //         console.log("Fornecedor Atualizado com sucesso!");
    //     });
    
    // const inserirPersonalidadeJuridica = (fornecedor, personalidade) => {
    //     fornecedor.setPersonalidadeJuridica(personalidade)
    //         .then(()=> {
    //             return;
    //         })
    // }

    // CRIANDO FORNECEDOR
    // const criarFornecedor = Fornecedor.create({
    //     razaoSocial: "Teste 2",
    //     nome: "Teste 2",
    //     personalidadeJuridicaId: 1 
    // });

    // const criarTelefone = Telefone.create({
    //     numero: "86999270711"
    // });

    // Promise.all([criarFornecedor, criarTelefone])
    // .then((result) => {
    //     const fornecedor = result[0];
    //     const telefone = result[1];
    //     fornecedor.addTelefone(telefone);
    // });

    // CRIANDO COM ASSOCIAÇÕES
    // Fornecedor.create({
    //     razaoSocial: "Teste 4",
    //     nome: "Teste 4",
    //     personalidadeJuridicaId: 1,
    //     telefones: []
    // }, {
    //     include: [Telefone]
    // })
    // .then (result => {
    //     console.log("Concluido");
    // });
        
}