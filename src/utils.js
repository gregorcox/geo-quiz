// Generate a random country from API
export const getRandomCountry = (countries) => {
    return countries[Math.floor(
        Math.random() * countries.length
    )];
}

// Shuffle an array
export const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
}