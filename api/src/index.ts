import Routes from '@shared/infra/http/routes/index.routes';
import App from './app';

const app = new App();

app.start({ routes: Routes }).then(() => app.listen(3333));
