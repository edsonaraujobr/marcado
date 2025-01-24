import { server } from "../src/server.js"; 
import dotenv from "dotenv";

dotenv.config({ path: "../.env.test" });

let app;

before((done) => {
  app = server;  
  done();
});

after((done) => {
  if (app) {
    app.close(done); 
  } else {
    done();
  }
});
