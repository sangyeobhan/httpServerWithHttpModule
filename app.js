const http = require('http');

const server = http.createServer();

const users = [
    {
        id: 1,
        name: 'Rebekah Johnson',
        email: 'Glover12345@gmail.com',
        password: '123qwe',
    },
    {
        id: 2,
        name: 'Fabian Predovic',
        email: 'Connell29@gmail.com',
        password: 'password',
    },
];

const posts = [
    {
        id: 1,
        title: '간단한 HTTP API 개발 시작!',
        content:
            'Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.',
        userId: 1,
    },
    {
        id: 2,
        title: 'HTTP의 특성',
        content: 'Request/Response와 Stateless!!',
        userId: 1,
    },
];

const hrl = function (request, response) {
    const { url, method } = request;

    if (method === 'POST') {
        if (url === '/users/signup') {
            let body = '';

            request.on('data', (data) => {
                body += data;
            });

            request.on('end', () => {
                const user = JSON.parse(body);

                if (!users.some((e) => e.email === user.email)) {
                    users.push({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        password: user.password,
                    });
                    response.writeHead(200, {
                        'Content-Type': 'application/json',
                    });
                } else {
                    response.writeHead(409, {
                        'Content-Type': 'application/json',
                    });
                }

                response.end(JSON.stringify({ users: users }));
            });
        }
    }
};

server.on('request', hrl);

const IP = '127.0.0.1';
const PORT = 8000;

server.listen(PORT, IP, function () {
    console.log('server is on');
});
