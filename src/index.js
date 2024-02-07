import app from './app/app.js';

const runApp = async () => {
    await app();
};

runApp().catch(error => {
    console.error(error);
});