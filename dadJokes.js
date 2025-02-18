const axios = require('axios');

async function getRandomJoke() {
    try {
        const response = await axios.get('https://icanhazdadjoke.com/', {
            headers: { 'Accept': 'application/json' }
        });
        if (response.data && response.data.joke) {
            return response.data.joke;
        } else {
            throw new Error('No joke found');
        }
    } catch (error) {
        console.error('Error fetching joke:', error);
        return 'Sorry, I couldn\'t fetch a joke at the moment.';
    }
}

module.exports = {
    getRandomJoke
};