import App from './app';
import Routes from './shared/infra/http/routes/index.routes';

const app = new App();

app.start({ routes: Routes }).then(() => app.listen(3333));
