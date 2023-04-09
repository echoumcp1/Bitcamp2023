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
/* 
    Student && income < 80000 && filing status is not married filed jointly:
    Income < 160000 && married filed jointly:
*/
export function calculateCollegeCredit(filing_status, income, currTaxLiability, isStudent) {
    if(isStudent) {
        /* Student && income < 80000 && filing status is not married filed jointly: */
        if ((income < 80000 && filing_status !== "Married filing jointly") ||
            (income < 160000 && filing_status === "Married filing jointly")) {
        console.log(`${filing_status}, ${income}, ${currTaxLiability}, ${isStudent}`);
            if(currTaxLiability < 0) {
                return 1000
            } else if (currTaxLiability <= 2500) {
                let difference = 2500 - currTaxLiability 
                let calculation = 0 - (.4 * difference)
                return calculation
            } else {
                return currTaxLiability - 2500
            }
    }
    }
    return 0;
}

// come back to kind of confusing, has something to do with mortgage amount
export function calculateMortgageDeduction (amount) {
    return amount

}

// take the medical expenses out of pocket. AGI is the total income - deductions
// the total amount of deductions is the minimum of (.075 * income, paid out of pocket)
export function calculateMedicalDeductions (agi, medicalPaidOutOfPocket, currTaxLiability) {
    return currTaxLiability - Math.min((.075 * agi), medicalPaidOutOfPocket) 
}

// thersehold is at 60% AGI for deductions 
export function calculateDonationDeductions (agi, totalDonationDeductions, amount) {
    if (totalDonationDeductions < (.6 * agi)) {
        return deduction = Math.min(amount, (.6 * agi) - totalDonationDeductions) // deduction is either the amount or the amount left in thereshold
    } else return 0

}

export function calculateTaxDeductions (filing_status, stateTaxPaid, currTaxLiability) {
    var total;
    if (filing_status === "Married filing separate") {
        total = Math.min(5000, stateTaxPaid);
    }
    else {
        total = Math.min(10000, stateTaxPaid);
    }
    
    return currTaxLiability - stateTaxPaid;
}

export function calculateDependentCredits(filing_status, income, dependants, currTaxLiability) {
    if ((filing_status === "Married filing jointly" && income <= 400000) ||
        (filing_status != "Married filing jointly" && income <= 200000)) {
        // 2000 credit for each dependent
        let total_possible_benefits = dependants * 2000

        // can get all the benefits if the total_possible_benefits less than the current tax liability
        if (currTaxLiability >= total_possible_benefits) {
            let difference = currTaxLiability - total_possible_benefits
        } else {
            if(currTaxLiability < 0) {
                let creditBenefit = dependants * 1500
            } else {

            }
            let difference = total_possible_benefits - currTaxLiability

            /* if you are expecting a refund*/
            if(difference > total_possible_benefits) {
                let newCredits = dependants * 1500
            } else {
                
            }
        }
        
    }
}

/* figure out tax bracket based off filing_status and income */
export function checkTaxBracket(filing_status, income) {
    if (filing_status === "Single") {
        if(income < singleTaxBracket[0][1]) {
            return singleTaxBracket[0][2]
        } else if(income < singleTaxBracket[1][1]) {
            return singleTaxBracket[1][2]
        } else if(income < singleTaxBracket[2][1]) {
            return singleTaxBracket[2][2]
        } else if(income < singleTaxBracket[3][1]) {
            return singleTaxBracket[3][2]
        } else if(income < singleTaxBracket[4][1]) {
            return singleTaxBracket[4][2]
        } else if(income < singleTaxBracket[5][1]) {
            return singleTaxBracket[5][2]
        } else {
            return singleTaxBracket[6]
        }
    } else if (filing_status === "Head of Household") {
        if(income < headOfHouseHoldTaxBracket[0][1]) {
            return headOfHouseHoldTaxBracket[0][2]
        } else if(income < headOfHouseHoldTaxBracket[1][1]) {
            return headOfHouseHoldTaxBracket[1][2]
        } else if(income < headOfHouseHoldTaxBracket[2][1]) {
            return headOfHouseHoldTaxBracket[2][2]
        } else if(income < headOfHouseHoldTaxBracket[3][1]) {
            return headOfHouseHoldTaxBracket[3][2]
        } else if(income < headOfHouseHoldTaxBracket[4][1]) {
            return headOfHouseHoldTaxBracket[4][2]
        } else if(income < headOfHouseHoldTaxBracket[5][1]) {
            return headOfHouseHoldTaxBracket[5][2]
        } else {
            return headOfHouseHoldTaxBracket[6]
        }
    } else if (filing_status === "Married, filing seperately") {
        if(income < marriedSeperateTaxBracket[0][1]) {
            return marriedSeperateTaxBracket[0][2]
        } else if(income < marriedSeperateTaxBracket[1][1]) {
            return marriedSeperateTaxBracket[1][2]
        } else if(income < marriedSeperateTaxBracket[2][1]) {
            return marriedSeperateTaxBracket[2][2]
        } else if(income < marriedSeperateTaxBracket[3][1]) {
            return marriedSeperateTaxBracket[3][2]
        } else if(income < marriedSeperateTaxBracket[4][1]) {
            return marriedSeperateTaxBracket[4][2]
        } else if(income < marriedSeperateTaxBracket[5][1]) {
            return marriedSeperateTaxBracket[5][2]
        } else {
            return marriedSeperateTaxBracket[6]
        }
    } else {
        if(income < marriedJointTaxBracket[0][1]) {
            return marriedJointTaxBracket[0][2]
        } else if(income < marriedJointTaxBracket[1][1]) {
            return marriedJointTaxBracket[1][2]
        } else if(income < marriedJointTaxBracket[2][1]) {
            return marriedJointTaxBracket[2][2]
        } else if(income < marriedJointTaxBracket[3][1]) {
            return marriedJointTaxBracket[3][2]
        } else if(income < marriedJointTaxBracket[4][1]) {
            return marriedJointTaxBracket[4][2]
        } else if(income < marriedJointTaxBracket[5][1]) {
            return marriedJointTaxBracket[5][2]
        } else {
            return marriedJointTaxBracket[6]
        }
    }

}





