import app from './app';
import { apiPort } from './common/constants/env-variables';
import { AppDataSource } from './database/data-source';

(async () => {
  try {
    await AppDataSource.initialize();
    app.listen(apiPort, () => {
      console.log(`server running on port : ${apiPort}`);
    });
  } catch (error) {
    console.log({ error });
  }
})();
