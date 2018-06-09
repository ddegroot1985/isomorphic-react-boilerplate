import express from 'express';
import fs from 'fs';
import path from 'path';
import serverRenderer from './serverRenderer';

const htmlFilePath = path.resolve(__dirname, 'index.html');

const htmlTemplate = fs.readFileSync(htmlFilePath, 'utf8');

const server = express();

server.use(express.static(path.resolve(__dirname, 'public')));

server.get('*', async (req, res, next) => {
    try {
        const serverRender = await serverRenderer(req.url);

        // Handle redirects
        if (serverRender.redirectUrl) {
            res.redirect(serverRender.redirectUrl);
        } else {
            res.status(serverRender.statusCode);

            // Inject initial redux state
            let parsedHtml = htmlTemplate.replace(
                /<body.*>/i,
                (match) => {
                    return `
                        ${match}
                        <script>
                            window.initialReduxState = ${JSON.stringify(serverRender.globals.initialReduxState)}
                        </script>`;
                }
            );

            // Inject rendered html
            parsedHtml = parsedHtml.replace('<!-- App -->', serverRender.html);

            res.send(parsedHtml);
        }
    } catch (error) {
        return next(error);
    }

    return next();
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Project is running at http://localhost:${port}/`);
});
