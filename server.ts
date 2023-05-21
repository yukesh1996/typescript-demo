import app from './app/app';
import { configureDB } from './app/models';
const port = process.env.PORT || 3000;

(async () => {
  await configureDB();
  app.listen(port, () => {
    console.log(`Server listening on Port: ${port}`);
  });
})();
