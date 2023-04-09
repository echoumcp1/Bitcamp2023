/* Tax Brackets and Their Rates */
const singleTaxBracket = 
[
    [0, 11000,.10],
    [11001,44725,.12],
    [44726,95375,.22],
    [95376,182100,.24],
    [182101,231251,.32],
    [231251,578125,.35],
    [.37]
]

const headOfHouseHoldTaxBracket = 
[
    [0, 15700,.10],
    [15701,59850,.12],
    [59851,95350,.22],
    [95351,182100,.24],
    [182101,231250,.32],
    [231251,578100,.35],
    [.37]
]

const marriedJointTaxBracket = 
[
    [0, 22000,.10],
    [22001,89450,.12],
    [89451,190750,.22],
    [190751,364200,.24],
    [364201,462500,.32],
    [462501,693750,.35],
    [.37]
]

const marriedSeperateTaxBracket = 
[
    [0, 11000,.10],
    [11001,44725,.12],
    [44726,95375,.22],
    [95376,182100,.24],
    [182101,231250,.32],
    [231251,346875,.35],
    [.37]
]

/* gets called whenever we need to calculate the total tax credit */
function calculateCollegeCredit(filing_status, income, isStudent, totalCredits, currTaxLiability) {
    if(isStudent) {
        if(filing_status)
            //if negative then $1000 is applied to currTaxLiability
            if(currTaxLiability < 0) {
                return currTaxLiability -= 1000
            } else if (currTaxLiability <= 2500) {
                difference = 2500 - currTaxLiability 
                calculation = 0 - (.4 * difference)
                return calculation
            } else {
                return currTaxLiability - 2500
            }
        }
}

// come back to kind of confusing, has something to do with mortgage amount
function calculateMortgageDeduction (filing_status,) {

}

// take the medical expenses out of pocket. AGI is the total income - deductions
// the total amount of deductions is the minimum of (.075 * income, paid out of pocket)
function calculateMedicalDeductions (agi, medicalPaidOutOfPocket, currTaxLiability) {
    return currTaxLiability - min((.075 * agi), medicalPaidOutOfPocket) 
}

// thersehold is at 60% AGI for deductions 
function calculateDonationDeductions (agi, totalDonationDeductions, amount) {
    if (totalDonationDeductions < (.6 * agi)) {
        deduction = min(amount, (.6 * agi) - totalDonationDeductions) // deduction is either the amount or the amount left in thereshold
    }

}

function calculateDependentCredits() {

}

function calculateTaxDeductions() {

}




function parseOutput(text) {
    //Array with the following properties
    //[isEligble,deduction/credit,category]
    const res = text.split(",");
    
    if (res[0] === Eligible.Yes) {
        if (res[1] === Type.Credit) {
            if (res[2] === Category.Education) {
                calculateCollegeCredit()
            }
            if (numDependents > 0) {
                calculateDependentCredits()
            }
        }
        else if (res[1] === Type.Deduction) {
            switch (res[2]) {
                case Category.Medical:
                    calculateMedicalDeductions()
                    break;
                case Category.Donation:
                    calculateDonationDeductions()
                    break;
                case Category.Taxes:
                    calculateTaxDeductions()
                    break;
                case Category.MInterest:
                    calculateMortgageDeduction()
                    break;
                default:
                    return ["invalid deduction detected"];
            }
        }
        else {
            return ["invalid pattern detected"];
        }
    }
    else if (res[0] === Eligible.No){
        return ["ineligible"];
    }
    else {
        return ["invalid pattern detected"];
    }
}
