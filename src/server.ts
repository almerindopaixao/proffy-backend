import app from './app';
import config from './config/appConfig';

app.listen(config.port, () => {
  console.log(`> Servidor rodando em http://localhost:${config.port}`);
});
