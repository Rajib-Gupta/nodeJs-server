const appSettings = {
    Mysql: {
      PORT: process.env.MYSQL_PORT,
      HOST: process.env.MYSQL_HOST,
      USER:process.env.MYSQL_USER,
      DB: process.env.MYSQL_DB
    },
    app:{
        PORT:process.env.PORT,
        HOST:process.env.HOST
    },
    logging: {
      folderName: "logs",
      level: "error",
    },
  };
  
  module.exports = appSettings;
  