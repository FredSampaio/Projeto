ALUNOS
Frederico de Oliveira Sampaio	8922100
Leonardo Mellin Ferreira		7982767
Thiago Akio Tanaka				8922114
Yuri Toledo Neves 				8124361


Trabalho 01 - Mockup Funcional da Aplicação Pet-Shop


O trabalho é composto por diferentes diretórios, representando as diferentes páginas do sistema, cada um contendo o arquivo html e css, assim como as imagens que são utilizadas em cada página.


INDEX.html
Página inicial do sistema. O usuário, caso não tenha cadastro, pode efetua-lo, ou caso já possua, acessa sua conta. Como o usuário pode ser tanto um cliente quanto um administrador, ao apertar o botão de login, o sistema verificará o tipo de usuário e irá ser redirecionado ou para a página do cliente (USER.html) ou para a página do administrador (ADMIN-CADASTRAR.html)

USER.html
Ao logar como cliente, essa página é aberta, e um menu com todas as opções possíveis para o cliente é apresentado.

ADMIN-CADASTRAR.html
Ao logar como administrador, essa página é aberta. Nela, é possível fazer todas as operações de cadastro através do sub-menu. Ao clicar em uma das outras duas opções do menu principal, o usuário é redirecionado para a página ADMIN-SERVICOS.html ou para a página ADMIN_PRODUTOS.html.

ADMIN_PRODUTOS.html
Ao ser redirecionado para essa página, é possível fazer todas as operações de gerenciamento de produtos através do sub-menu.

ADMIN-SERVICOS.html
Ao ser redirecionado para essa página, é possível ao administrador gerenciar os serviços oferecidos aos clientes.


PROBLEMAS:

--> Para a página do administrador, tentamos fazer um sub-menu para as duas opções: Cadastrar e Gerenciar Produtos. Porém o sistema de "sub-abas" não estava funcionando corretamente, então separamos cada opção em um arquivo html diferente, e linkamos o menu principal, imitando assim o fuincionamento das abas. Consequentemente, tivemos que fazer um html saparado também para a opção Gerenciamento de Serviços.

--> No calendário, tentamos fazer o tooltip aparecer apenas quando o mouse estiver em cima do dia desejado. Porém, ao passar o mouse em qualquer dia do calendário, todos os compromissos aparecem na tela.


NOTAS:

--> O site funciona em diferentes tamanhos de telas e para diferentes dispositivos, pela maneira como os elementos foram dispostos (inline blocks e tabelas).




