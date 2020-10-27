![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0e613913-893a-416b-b1aa-e20e2c2d9aa1/ff.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0e613913-893a-416b-b1aa-e20e2c2d9aa1/ff.png)

### **Funcionalidades**

Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação para cumprir todos os requisitos.

### **1. Autenticação**

Permita a criação de usuários e a autenticação de usuários criados. Esses usuários serão tanto os administradores da aplicação quanto os entregadores.

Para isso, você pode criar uma tabela `users`, onde todos os usuários salvos nessa tabela serão utilizados nas rotas autenticadas que você acessar.

Os admins serão responsáveis pela criação de novos usuários e criação de encomendas.

Os usuários não admin devem ter um campo na tabela de dados `deliveryman` que será `true` quando o usuário for um entregador.

- A autenticação pode ser feita utilizando JWT.

**Dica:** Realize a validação dos dados de entrada;

### 2**. Gestão de usuários**

Você precisa permitir que usuários sejam mantidos (cadastrados/atualizados) na aplicação, estas serão rotas **autenticadas** onde apenas usuários autenticados, que **não são entregadores,** podem acessa-la.

Os usuários possuirão os **seguintes** **campos:**

- id
- name (Nome do usuário)
- e-mail (E-mail do usuário)
- cpf (CPF do usuário)
- senha secreta (senha para login)
- deliveryman (Será true caso o usuário seja um entregador, false quando for um admin)

Utilize uma tabela no banco de dados chamada `users` para guardar informações de todos os usuários.

O cadastro de usuários só pode ser feito por administradores autenticados na aplicação, em uma rota como a seguinte:

```tsx
**POST "/users" // Cria um novo usuário**
```

### 3**. Gestão de encomendas**

Você deve permitir que encomendas sejam mantidas (cadastradas/atualizadas) na aplicação, estas serão rotas **autenticadas** onde apenas usuários autenticados, que **não são entregadores,** podem acessa-la. Para isso, você deve criar uma tabela `deliveries` que possuirá os **seguintes campos:**

- id (id da entrega)
- deliveryman_id (referência ao usuário entregador);
- product (nome do produto a ser entregue);
- adress (rua com número, complemento)
- postal_code (CEP)
- neighborhood (bairro/vizinhança relacionada ao endereço)
- city (cidade referente ao endereço)
- state (estado referente ao endereço)
- canceled_at (data de cancelamento, se cancelada);
- signature_id (referência à uma assinatura do destinatário, que será uma imagem);
- start_date (data de retirada do produto);
- end_date (data final da entrega);
- created_at;
- updated_at;

A **data de início** deve ser cadastrada assim que for feita a retirada do produto pelo entregador, e as retiradas só podem ser feitas entre as 08:00h e 12:00h.

A **data de término** da entrega deve ser cadastrada quando o entregador finalizar a entrega:

Os campos **recipient_id** e **deliveryman_id** devem ser cadastrados no momento que for cadastrada a encomenda.

Para essa gestão, crie rotas para listagem/cadastro/atualização/remoção de encomendas;

### **Funcionalidades do entregador**

Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação para os entregadores.

### **1. Autenticação de entregadores**

Os entregadores devem ser capazes de logar na aplicação informando o CPF e a senha deles, seguindo a tabela de usuários criada anteriormente.

### 2**. Visualizar encomendas**

Para que o entregador possa visualizar suas encomendas, ele deverá estar logado na aplicação. Essa funcionalidade deve retornar as encomendas atribuídas a ele, que **não estejam entregues ou canceladas**;

Permita também que ele liste apenas as encomendas que já foram **entregues** por ele.

Além disso o entregador também deve ter uma opção para filtrar as encomendas pelo bairro digitado no campo de busca.

Exemplo de requisição: `GET https://fastfeet.com/deliveryman/deliveries`

### 3**. Alterar status de encomendas**

Você deve permitir que o entregador tenha rotas para incluir uma data de retirada (start_date) e data de entrega (end_date) para as encomendas. O entregador só pode fazer **5 retiradas por dia**.

Obs.: Para a funcionalidade de finalizar a entrega, você deverá permitir o envio de uma imagem que irá preencher o campo signature_id da tabela de encomendas.
