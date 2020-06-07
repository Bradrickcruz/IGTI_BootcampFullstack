export const swaggerDoc = {
  swagger: '2.0',
  info: {
    description:
      'API demonstrativa de criação, exclusão, alteração e leitura de contas bancárias simples.',
    version: '1.0.0',
    title: 'My Bank API',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'bryan.oficio@gmail.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  host: 'localhost:3000',
  basePath: '/v2',
  tags: [
    {
      name: 'account',
      description: 'CRUD de contas bancárias',
      externalDocs: {
        description: 'Find out more',
        url: 'http://swagger.io',
      },
    },
  ],
  schemes: ['https', 'http'],
  paths: {
    '/account/all': {
      get: {
        tags: ['account'],
        description: 'Faz a leitura de todas as contas cadastradas',
        operationId: 'getAllAccount',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'Leitura feita com sucesso',
          },
          '400': {
            description: 'Um erro ocorreu',
          },
        },
      },
    },
    '/account/:id': {
      get: {
        tags: ['account'],
        description: 'Faz a leitura de uma conta bancária específica',
        operationId: 'getAccountById',
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'query',
            description: 'Id da conta',
            required: true,
            type: 'number',
          },
        ],
        responses: {
          '200': {
            description: 'Leitura feita com sucesso',
          },
          '400': {
            description: 'Um erro ocorreu',
          },
        },
      },
    },
  },
};
