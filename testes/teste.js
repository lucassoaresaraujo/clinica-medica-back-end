module.exports = async app => {
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


    // const enuns = Enum.findAll({where: {tipo: 'telefone.tipo'}});
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

    const seederArray = [];

    // const situacoesFamiliar = [
    //     {
    //         nome: 'Convive com companheira(o) e filho(s)',
    //         tipo: 'situacao_familiar'
    //     },
    //     {
    //         nome: 'Convive com companheira(o) com laços conjungais e sem filho(s)',
    //         tipo: 'situacao_familiar'
    //     },
    //     {
    //         nome: 'Convive com companheira(o) com filho(s) e/ou outro(s) familiar(es)',
    //         tipo: 'situacao_familiar'
    //     },
    //     {
    //         nome: 'Convive com familiar(es) sem companheira(o)',
    //         tipo: 'situacao_familiar'
    //     },
    //     {
    //         nome: 'Convive com outra(s) pessoa(s) sem laços consanguineos e/ou laços conjungais',
    //         tipo: 'situacao_familiar'
    //     },
    //     {
    //         nome: 'Vive só',
    //         tipo: 'situacao_familiar'
    //     }
    // ];
    // const criarSituacaoFamiliar = Enum.bulkCreate(situacoesFamiliar);
    // seederArray.push(criarSituacaoFamiliar);


    // const generos = [
    //     {
    //         nome: 'Masculino',
    //         tipo: 'genero_sexual'
    //     },
    //     {
    //         nome: 'Feminino',
    //         tipo: 'genero_sexual'
    //     }
    // ];
    // const criarGeneros = Enum.bulkCreate(generos);
    // seederArray.push(criarGeneros);

    // const tiposSanguineos = [
    //     {
    //         nome: 'A+',
    //         tipo: tipo_sanguineo',
    //     },
    //     {
    //         nome: 'A-',
    //         tipo: tipo_sanguineo',
    //     },
    //     {
    //         nome: 'B+',
    //         tipo: tipo_sanguineo',
    //     },
    //     {
    //         nome: 'B-',
    //         tipo: tipo_sanguineo',
    //     },
    //     {
    //         nome: 'AB+',
    //         tipo: tipo_sanguineo',
    //     },
    //     {
    //         nome: 'AB-',
    //         tipo: tipo_sanguineo',
    //     },
    //     {
    //         nome: 'O+',
    //         tipo: tipo_sanguineo',
    //     },
    //     {
    //         nome: 'O-',
    //         tipo: tipo_sanguineo',
    //     }
    // ];
    // const criarTiposSanguineos = Enum.bulkCreate(tiposSanguineos);
    // seederArray.push(criarTiposSanguineos);

    // const conselhos = [
    //     {
    //         nome: 'CRAS',
    //         tipo: 'conselho_saude',
    //     },
    //     {
    //         nome: 'CRBM',
    //         tipo: 'conselho_saude',
    //     },
    //     {
    //         nome: 'CREFITO',
    //         tipo: 'conselho_saude',
    //     },
    //     {
    //         nome: 'COREN',
    //         tipo: 'conselho_saude',
    //     },
    //     {
    //         nome: 'CREF',
    //         tipo: 'conselho_saude',
    //     },
    //     {
    //         nome: 'CRF',
    //         tipo: 'conselho_saude',
    //     },
    //     {
    //         nome: 'CRFA',
    //         tipo: 'conselho_saude',
    //     },
    //     {
    //         nome: 'CRM',
    //         tipo: 'conselho_saude',
    //     },
    //     {
    //         nome: 'CRN',
    //         tipo: 'conselho_saude',
    //     },
    //     {
    //         nome: 'CRO',
    //         tipo: 'conselho_saude',
    //     },
    //     {
    //         nome: 'CRP',
    //         tipo: 'conselho_saude',
    //     },
    //     {
    //         nome: 'CRT',
    //         tipo: 'conselho_saude',
    //     },
    //     {
    //         nome: 'CRNT',
    //         tipo: 'conselho_saude',
    //     },
    //     {
    //         nome: 'CRTR',
    //         tipo: 'conselho_saude',
    //     },
    //     {
    //         nome: 'CRMV',
    //         tipo: 'conselho_saude',
    //     }
    // ];

    // const criarConselhos = Enum.bulkCreate(conselhos);
    // seederArray.push(criarConselhos)


    // CRIAR ESCOLARIDADES

    // const escolaridades = [
    //     {
    //         nome: 'Não sabe ler/escrever',
    //         tipo: 'escolaridade',            
    //     },
    //     {
    //         nome: 'Alfabetizado',
    //         tipo: 'escolaridade',            
    //     },
    //     {
    //         nome: 'Ensino fundamental incompleto',
    //         tipo: 'escolaridade',            
    //     },
    //     {
    //         nome: 'Ensino fundamental completo',
    //         tipo: 'escolaridade',            
    //     },
    //     {
    //         nome: 'Ensino médio incompleto',
    //         tipo: 'escolaridade',            
    //     },
    //     {
    //         nome: 'Ensino médio completo',
    //         tipo: 'escolaridade',            
    //     },
    //     {
    //         nome: 'Superior incompleto',
    //         tipo: 'escolaridade',            
    //     },
    //     {
    //         nome: 'Superior completo',
    //         tipo: 'escolaridade',            
    //     },
    //     {
    //         nome: 'Especialização/Residência',
    //         tipo: 'escolaridade',            
    //     },
    //     {
    //         nome: 'Mestrado',
    //         tipo: 'escolaridade',            
    //     },
    //     {
    //         nome: 'Doutorado',
    //         tipo: 'escolaridade',            
    //     }
    // ];

    // const criarEscolaridades = Enum.bulkCreate(escolaridades);
    // seederArray.push(criarEscolaridades)

    // await Promise.all(seederArray);
    
        
}