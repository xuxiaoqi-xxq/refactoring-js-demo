function statement (invoice, plays) {
  return generateTxtResult(invoice, plays);
}

function statementHtml (invoice, plays) {
  return generateHtmlResult(invoice, plays);
}

function generateTxtResult(invoice, plays) {
    let calculateResult = calculate(invoice, plays);
    let txtResult = `Statement for ${invoice.customer}\n`;
    for (let perf of calculateResult.performances) {
        txtResult += ` ${perf.playName}: ${format(perf.amount)} (${perf.seats} seats)\n`;
    }
    txtResult += `Amount owed is ${format(calculateResult.totalAmount)}\n`;
    txtResult += `You earned ${calculateResult.volumeCredits} credits \n`;
    return txtResult;
}

function generateHtmlResult(invoice, plays){
    let calculateResult = calculate(invoice, plays);
    let htmlResult = `<h1>Statement for ${invoice.customer}</h1>\n`;
    htmlResult += `<table>\n<tr><th>play</th><th>seats</th><th>cost</th></tr>`;
    for (let perf of calculateResult.performances) {
        htmlResult += ` <tr><td>${perf.playName}</td><td>${perf.seats}</td><td>${format(perf.amount)}</td></tr>\n`;
    }
    htmlResult += '</table>\n';
    htmlResult += `<p>Amount owed is <em>${format(calculateResult.totalAmount)}</em></p>\n`;
    htmlResult += `<p>You earned <em>${calculateResult.volumeCredits}</em> credits</p>\n`;
    return htmlResult;
}

function calculate(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let performances = [];
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = calculateAmount(play, perf);
        volumeCredits += calculateVolumeCredits(perf, play);
        performances.push({'playName':play.name, 'amount': thisAmount / 100, 'seats': perf.audience});
        totalAmount += thisAmount;
    }
    return {'performances': performances, 'totalAmount': totalAmount / 100, 'volumeCredits': volumeCredits};
}

function calculateAmount(play, perf) {
    let thisAmount = 0;
    switch (play.type) {
          case 'tragedy':
            thisAmount = 40000;
            if (perf.audience > 30) {
              thisAmount += 1000 * (perf.audience - 30);
            }
            break;
          case 'comedy':
            thisAmount = 30000;
            if (perf.audience > 20) {
              thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
          default:
            throw new Error(`unknown type: ${play.type}`);
        }
    return thisAmount;
}

function calculateVolumeCredits(perf, play) {
    // add volume credits
    let volumeCredits = Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
    return volumeCredits;
}

const format = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      }).format;

module.exports = {
  statement, statementHtml
};
