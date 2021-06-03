import express, { Request, Response } from 'express';
import cors from 'cors';

// Modules User
import {users as listUser} from './data';
import User from './classes/User';
import IUser from './interfaces/IUser';

// Middlawres
import validId from './middlewares/md-valid-id';
import validUser from './middlewares/md-user';
import validName from './middlewares/md-valid-name';
import validPassword from './middlewares/md-valid-password';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log("server up") });

// Rota principal
app.get('/', (req: Request, res: Response) => {
  res.send(`
  <body style='margin:0;padding:0'>
      <div style='display: flex;justify-content: center;align-items: center; align-content: center;width:99vw;height:99vh'>
        <h1 style='font-size:60px;font-weigth:600'>🚀 API Recados</h1>
      </div>
  </body>
  `);
});

const user: IUser ={
  user: "alex", 
  password: "123", 
  repeatPass: "123",
};

const newUser = new User(user.user, user.password, user.repeatPass);
listUser.push(newUser);

// Rotas de Usuário
// Retornando todos os users
app.get("/users", (req: Request, res: Response) => {
  res.status(200).json({
    sucess: true,
    data: listUser
  });
});

// Retornando o usuário pelo ID
app.get("/user/:id", [validId, validUser], (req: Request, res: Response) => {
  const {data}: {data: User} = req.body;
  
  return res.status(200).json({
    success: true,
    data: data
  });

});

// Adicionado um novo usuário
app.post("/user/add", [validName, validPassword], (req: Request, res: Response) => {
  const {name, password, repeatPass}: {name: string, password: string, repeatPass: string} = req.body;

  const newUser = new User(name, password, repeatPass);
  listUser.push(newUser);

  return res.status(200).json({
    success: true,
    data: listUser[listUser.length - 1]
  });
  
});

// Rotas dos Recados
// Retornando todas as mensagem de um usuário
app.get("/messages/:id", [validId, validUser], (req: Request, res: Response) => {
  const {data}: {data: User} = req.body;
  return res.status(200).json({
    success: true,
    data: data.getAllMessages()
  });
});

// Salvando uma mensagem de um usuário
app.post("/message/add/:id", [validId, validUser], (req: Request, res: Response) => {
  const {description, details, data}: {description: string, details: string, data: User} = req.body;

  const messages = data.setMessages(description, details);

  return res.status(200).json({
    success: true,
    data: messages
  });

});