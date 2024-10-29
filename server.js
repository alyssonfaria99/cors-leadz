const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importa o middleware CORS
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para ativar CORS para todas as rotas
app.use(cors());

// Middleware para definir o cabeçalho Content-Security-Policy
app.use((req, res, next) => {
    // Permite scripts apenas do próprio servidor
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'");
    next();
});

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
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Inicia o servidor na porta correta
app.listen(PORT, () => console.log(`Proxy ativo na porta ${PORT}`));
