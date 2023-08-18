const dadJokes = [
    "Did you hear about the kidnapping at the park? They woke up.",
    "Why don't skeletons fight each other? They don't have the guts.",
    "I told my wife she was drawing her eyebrows too high. She seemed surprised.",
    "Parallel lines have so much in common. It's a shame they'll never meet.",
    "I used to play piano by ear, but now I use my hands.",
    "
];

const randomIndex = Math.floor(Math.random() * dadJokes.length);
const randomJoke = dadJokes[randomIndex];

console.log(randomJoke);
