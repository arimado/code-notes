var fortune = [
    'FUCK THE HATERS',
    'PANDA PANDA PANDA PANDA',
    'ULTRALIGHTBEAM'
]

var getRandomFortune = function () {
    var randomIndex = Math.floor(Math.random() * fortune.length);
    var result = fortune[randomIndex];
    return result;
};

exports.getFortune = getRandomFortune;
