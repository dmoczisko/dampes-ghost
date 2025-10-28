async function getRandomJoke() {
    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.joke) {
            return data.joke;
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