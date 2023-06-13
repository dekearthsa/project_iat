const calculateD = (inA, inB, stdA, stdB) => {

    // console.log(inA, inB, stdA, stdB)

    const isResult = (inB / stdB) - (inA / stdA)

    return isResult;

}

module.exports = calculateD