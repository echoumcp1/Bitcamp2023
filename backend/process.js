const fs = require('fs');
const readline = require('readline');


var file = "./gpt_output.txt";
var r = readline.createInterface({
    input : fs.createReadStream(file)
});

var numCategory = [0,0,0,0,0];

const CategoryDict = {
    "College" : 0,
    "Medical" : 1,
    "Donation" : 2,
    "Taxes" : 3,
    "Mortgage" : 4
}


const Eligible = {
    Yes : "Yes",
    No : "No"
}

const Type = {
    Credit : "Credit",
    Deduction : "Deduction"
}

const TransactionInfo = {
    Credit : 1,
    Deduction : 0,
    Ineligible : -1
}

r.on('line', function (text) {
    const words = text.split(",");
    console.log(getType(words));
    if (words[0] === Eligible.Yes) {
        countCategory(words[2]);
    }
});

function countCategory(category) {
    numCategory[CategoryDict[category]]++;
}

function getType(words) {
    var res;

    if (words[0] === Eligible.Yes) {
        if (words[1] === Type.Credit) {
            res = TransactionInfo.Credit
        }
        else if (words[1] === Type.Deduction) {
            res = TransactionInfo.Deduction;
        }
        else {
            throw new Error("invalid type detected");
        }
    }
    else if (words[0] === Eligible.No){
        res = TransactionInfo.Ineligible;
    }
    else {
        throw new Error("invalid eligibility pattern detected");
    }

    return res;
}


