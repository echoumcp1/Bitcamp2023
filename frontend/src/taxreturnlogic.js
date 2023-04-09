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
export function calculateCollegeCredit(filing_status, income, currTaxLiability) {
    if(filing_status, isStudent) {
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
export function calculateMortgageDeduction (amount) {
    return amount

}

// take the medical expenses out of pocket. AGI is the total income - deductions
// the total amount of deductions is the minimum of (.075 * income, paid out of pocket)
export function calculateMedicalDeductions (agi, medicalPaidOutOfPocket, currTaxLiability) {
    return currTaxLiability - min((.075 * agi), medicalPaidOutOfPocket) 
}

// thersehold is at 60% AGI for deductions 
export function calculateDonationDeductions (agi, totalDonationDeductions, amount) {
    if (totalDonationDeductions < (.6 * agi)) {
        deduction = min(amount, (.6 * agi) - totalDonationDeductions) // deduction is either the amount or the amount left in thereshold
    }

}

export function calculateTaxDeductions (agi, totalDonationDeductions, amount) {

}

export function calculateDependentCredits(filing_status, income, dependants) {
    if ((filing_status === "Married filing jointly" && income <= 400000) ||
        (filing_status != "Married filing jointly" && income <= 200000)) {
        // 2000 credit for each dependent
        total_possible_benefits = dependants * 2000

        // can get all the benefits if the total_possible_benefits less than the current tax liability
        if (currTaxLiability >= total_possible_benefits) {
            currTaxLiability - total_possible_benefits
        } else {
            if(currTaxLiability < 0) {
                creditBenefit = dependants * 1500
            } else {

            }
            difference = total_possible_benefits - currTaxLiability

            /* if you are expecting a refund*/
            if(difference > total_possible_benefits) {
                newCredits = dependants * 1500
            } else {
                
            }
        }
        
    }
}





