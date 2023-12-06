// server.js
const express = require('express');
const app = express();
const port = 3000;

// Example database connection using the 'mssql' package
const sql = require('mssql');

const config = {
  user: 'SAPRESS\Administrateur',
  password: '',
  server: 'localhost',
  database: 'sapress',
  options: {
    encrypt: true, // Use if connecting to SQL Server on Azure
  },
};

app.get('/obtenir-points-relais', async (req: any, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM point_relai');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
