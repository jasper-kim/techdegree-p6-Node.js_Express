const express = require('express');
const data = require('./data.json');
const projects = data.projects;

const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    res.render('project', {
        project_name: projects[req.params.id].project_name,
        description: projects[req.params.id].description,
        technologies: projects[req.params.id].technologies,
        live_link: projects[req.params.id].live_link,
        github_link: projects[req.params.id].github_link,
        image_urls: projects[req.params.id].image_urls
    });
});

app.use((req, res, next) => {
    const err = new Error("Not Found: It might not the page you are looking for...");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status);
    console.error(err);
    res.send(`
        <h1>${err.message}</h1>
        <h2>${err.status}</h2>
        <pre>${err.stack}</pre>
    `);
});

app.listen(3000, () => {
    console.log('The application s running on localhost: 3000!');
});