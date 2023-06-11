
module.exports = function(api) {
    api.cache(true);
    // Return the value that will be cached.
    return {
        presets: ["next/babel"],
        plugins: ['macros'],
    };

}
