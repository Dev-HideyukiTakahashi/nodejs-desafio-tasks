# Instruções
## Estrutura, regras e requisitos do projeto

O desafio consiste na criação de uma API em Node.js para gerenciar tarefas. O principal objetivo é aplicar os conceitos de CRUD (Create, Read, Update, Delete) e manipulação de arquivos.

### Estrutura de uma Tarefa
Cada tarefa deve ser composta pelas seguintes propriedades:

* **id:** Um identificador único para cada tarefa
* **title:** O título da tarefa
* **description:** Uma descrição detalhada da tarefa
* **completed_at:** A data de conclusão da tarefa, que deve iniciar como null
* **created_at:** A data de criação da tarefa
* **updated_at:** A data da última atualização da tarefa, que deve be alterada a cada modificação

### Regras das Rotas
A API deve possuir as seguintes rotas e regras de negócio:

* **POST /tasks**
  * Cria uma nova tarefa.
  * Recebe title e description no corpo da requisição.
  * Os campos id, created_at, updated_at e completed_at devem ser preenchidos automaticamente.

* **GET /tasks**
  * Lista todas as tarefas existentes.
  * Permite a busca por tarefas, filtrando pelos campos title e description.

* **PUT /tasks/:id**
  * Atualiza uma tarefa específica pelo id.
  * Recebe title e/ou description no corpo da requisição para atualização.
  * Antes de atualizar, deve validar se o id fornecido corresponde a uma tarefa existente.

* **DELETE /tasks/:id**
  * Remove uma tarefa específica pelo id.
  * Antes de remover, deve validar se o id fornecido corresponde a uma tarefa existente.

* **PATCH /tasks/:id/complete**
  * Altera o status da tarefa entre completa e não completa, modificando o campo completed_at.
  * Antes de alterar, deve validar se o id fornecido corresponde a uma tarefa existente.

### E a importação do CSV?
Normalmente em uma API, a importação de um CSV acontece enviando o arquivo pela rota, por meio de outro formato, chamado multipart/form-data. Como esse desafio visa manter a implementação mais simples, você pode realizar essa funcionalidade por meio de um arquivo de script import-csv.js, por exemplo.

Para realizar isso, utilize a lib `csv-parse`, utilizando o exemplo de *iterador async*.

Com a biblioteca instalada utilizando o gerenciador de pacotes de sua preferência, crie um arquivo a parte para realizar a leitura do arquivo CSV.

Nesse arquivo, deve ser feito a leitura do CSV e para cada linha, realize uma requisição para a rota POST - /tasks, passando os campos necessários.

#### Recomendação do formato do CSV:
```text
title,description
Task 01,Descrição da Task 01
Task 02,Descrição da Task 02
Task 03,Descrição da Task 03
Task 04,Descrição da Task 04
Task 05,Descrição da Task 05
```
### Recomendação de implementação
Semelhante ao que foi feito no stream-http-server.js, nas aulas, utilizando o for await, também é possível fazer com o parse da lib informada acima. (Lembre-se de pular a primeira linha do CSV)

### Indo além
Algumas sugestões do que pode ser implementado:

- Validar se as propriedades title e description das rotas POST e PUT estão presentes no body da requisição.
- Nas rotas que recebem o /:id, além de validar se o id existe no banco de dados, retornar a requisição com uma mensagem informando que o registro não existe.
```
