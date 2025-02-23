const fetch = require('node-fetch');

async function handleRequest(request) {
    try {
        const { url, methode, params } = request.body;
        const apiUrl = new URL(url);

        const init = {
            method: methode,
            headers: request.headers
        };

        // تنظیم هدر User-Agent
        init.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';

        // فقط برای متدهایی که می‌توانند بدنه داشته باشند بدنه را تنظیم کنید
        if (['POST', 'PUT', 'DELETE'].includes(methode.toUpperCase())) {
            init.body = JSON.stringify(params);
        }

        const apiRequest = await fetch(apiUrl.toString(), init);
        const responseData = await apiRequest.json();

        return responseData;
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = handleRequest;
