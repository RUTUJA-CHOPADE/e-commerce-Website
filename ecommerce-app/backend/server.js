const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Authenticate with the database
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync models with the database
    // Use { alter: true } in development to update tables without dropping them
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized.');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

startServer();
