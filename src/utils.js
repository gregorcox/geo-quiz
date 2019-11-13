// Generate a random country from API
export const getRandomCountry = (countries) => {
    return countries[Math.floor(
        Math.random() * countries.length
    )];
}