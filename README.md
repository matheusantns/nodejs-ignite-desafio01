# nodejs-ignite-desafio01

## API para exemplo de lista de afazeres (todos)

O desafio era criar todos os endpoints da API respeitando as regras estipuladas. Sendo eles:
### POST `/users`
Criar novos usuários.

### GET `/todos`
Buscar a lista de afazeres de um usuário.

### POST `/todos`
Adicionar um novo todo a um usuário.

### PUT `/todos/:id`
Alterar o conteúdo de um todo.

### PATCH `/todos/:id/done`
Marcar um todo como done

### DELETE `/todos/:id`
Deletar um todo.

E suas regras:
- **Should be able to create a new user**
- **Should not be able to create a new user when username already exists**
- **Should be able to list all user's todos**
- **Should be able to create a new todo**
- **Should be able to update a todo**
- **Should not be able to update a non existing todo**
- **Should be able to mark a todo as done**
- **Should not be able to mark a non existing todo as done**
- **Should be able to delete a todo**
- **Should not be able to delete a non existing todo**

Foi um ótimo primeiro contato com o NodeJS e o backend tratando de regras de negócios, lógica e prática!
