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
    {
        id: 3,
        name: 'bobo',
        email: 'dsfafe324@gmail.com',
        password: 'fdsf3222',
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
    {
        id: 3,
        title: '해피해피!',
        content: '캐캐캐캐ㅐ캐.',
        userId: 2,
    },
    {
        id: 4,
        title: '배고픈걸?',
        content: '그치!!',
        userId: 1,
    },
];

const hrl = function (request, response) {
    const { url, method } = request;

    if (method === 'GET') {
        if (url === '/posts') {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ posts: posts }));
        }
    }

    if (method === 'PATCH') {
        if (url === '/posts') {
            let body = '';

            request.on('data', (data) => {
                body += data;
            });

            request.on('end', () => {
                const patchedPost = JSON.parse(body);
                if (patchedPost.id > posts.length) {
                    response.writeHead(409, {
                        'Content-Type': 'application/json',
                    });
                    response.end(JSON.stringify({ posts: posts }));
                } else if (
                    posts[patchedPost.id - 1].userId === patchedPost.userId
                ) {
                    posts[patchedPost.id - 1].title = patchedPost.title;
                    posts[patchedPost.id - 1].content = patchedPost.content;

                    response.writeHead(200, {
                        'Content-Type': 'application/json',
                    });
                    response.end(JSON.stringify({ posts: posts }));
                } else {
                    response.writeHead(409, {
                        'Content-Type': 'application/json',
                    });
                    response.end(JSON.stringify({ posts: posts }));
                }
            });
        }
    }

    if (method === 'DELETE') {
        if (url === '/posts') {
            let body = '';

            request.on('data', (data) => {
                body += data;
            });

            request.on('end', () => {
                const willDelete = JSON.parse(body);
                if (willDelete.id > posts.length) {
                    response.writeHead(409, {
                        'Content-Type': 'application/json',
                    });
                    response.end(JSON.stringify({ posts: posts }));
                } else if (
                    posts[willDelete.id - 1].userId === willDelete.userId &&
                    posts[willDelete.id - 1].title === willDelete.title &&
                    posts[willDelete.id - 1].content === willDelete.content
                ) {
                    posts.splice(willDelete.id - 1, 1);
                    for (let i = willDelete.id - 1; i < posts.length; i++) {
                        posts[i]['id'] = i + 1;
                    }
                    response.writeHead(200, {
                        'Content-Type': 'application/json',
                    });
                    response.end(JSON.stringify({ posts: posts }));
                } else {
                    response.writeHead(409, {
                        'Content-Type': 'application/json',
                    });
                    response.end(JSON.stringify({ posts: posts }));
                }
            });
        }
    }

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
                        id: users.length + 1,
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
        if (url === '/posts') {
            let body = '';

            request.on('data', (data) => {
                body += data;
            });

            request.on('end', () => {
                const post = JSON.parse(body);

                posts.push({
                    id: posts.length + 1,
                    title: post.title,
                    content: post.content,
                    userId: post.userId,
                });
                response.writeHead(200, {
                    'Content-Type': 'application/json',
                });

                response.end(JSON.stringify({ posts: posts }));
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
