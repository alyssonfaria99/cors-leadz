const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Importa o middleware CORS
const app = express();
const PORT = process.env.PORT || 3000;

// Ativa o CORS para todas as rotas
app.use(cors());

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

// Rota para evitar erro 503 no favicon
app.get('/favicon.ico', (req, res) => res.status(204));

// Rota para o proxy
app.post('/proxy', async (req, res) => {
    try {
        // Substitua 'YOUR_SCRIPT_URL' pela URL do Google Apps Script copiada anteriormente
        const googleAppsScriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

        // Encaminha a requisição para o Google Apps Script com os dados recebidos
        const response = await axios.post(googleAppsScriptUrl, req.body, {
            headers: { 'Content-Type': 'application/json' }
        });

        // Envia a resposta de volta para o cliente (WaSpeed)
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Erro ao encaminhar a requisição:', error.message);
        res.status(500).json({ status: 'error', message: 'Erro ao processar a requisição' });
    }
});

// Inicia o servidor na porta definida
app.listen(3000, () => console.log(`Proxy ativo na porta 3000`));
