const avgCalculate = (array) => {

    const n = array.length
    const sum = array.reduce((a, b) => a + b)
    const mean = array.reduce((a, b) => a + b) / n
    const standardDeviation = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    // console.log(mean, standardDeviation, sum)
    const replyData = {
        sumOf: mean,
        standardDeviation: standardDeviation
    }   

    return replyData;

}

module.exports = avgCalculate