# Recuperação de senha

**RF (Requisitos Funcionais)**

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF (Requisitors Não Funcionais)**

- Utilizar Mailtrap para testar envios em dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (Background job)


**RN (Regra de Negoócio)**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;


# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RNF**

- Utilizar o multer para upload de avatar;

**RN**

- O usuário não pode alterar seu email para um e-mail já utilizado;
- Para atualizar sua senha, o usuário de informar a senha antiga;
- Para atualizar a senha, o usuário precisa confirmar a nova senha;


# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que hovuer um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviados em tempo-real utiliznado Socket.io;

**RN**

- A notificação deve te rum status de lida ou não-lida para que o prestador possa controlar;


# Agendamento de serviços

**RF**

- O usuario deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horatios disponíveis em um dia especifico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;


**RN**

- Cada agendamento deve durar 1hr exatamente;
- Os agendamentos devem estar disponíveis entre 8hr às 18hr (Primeiro às 8hr, último as 17h);
- O usuário não pode agendar em um horario já ocupado;
- O usuário não pode agendar em um horario que já passou;
- O usuário não pode agendar serviços consigo mesmo;




