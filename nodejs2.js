const http = require('http');
const fs = require('fs');
const url = require('url');

const diccionario = fs.readFileSync('diccionario.txt', 'utf8').split('\n');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const numberOfWords = parseInt(parsedUrl.query.x) || 4; //4 como valor default

  if (parsedUrl.pathname === '/') {
    const password = generatePassword(numberOfWords);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Contrasena aleatoria: ${password}`);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Pagina no encontrada');
  }
});


function generatePassword(numberOfWords) {
  const passwordWords = [];
  for (let i = 0; i < numberOfWords; i++) {
    const randomIndex = Math.floor(Math.random() * diccionario.length);
    passwordWords.push(diccionario[randomIndex]);
  }
  return passwordWords.join("").replace(/\s+/g, ''); 
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
