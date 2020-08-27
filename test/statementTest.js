const test = require('ava')
const {statement} = require('../src/statement');

const plays = {
  'hamlet': {
    'name': 'Hamlet',
    'type': 'tragedy',
  },
  'as-like': {
    'name': 'As You Like It',
    'type': 'comedy',
  },
  'othello': {
    'name': 'Othello',
    'type': 'tragedy',
  },
};

test('statement test. Customer BigCo watch performance hamlet with 30 audiences', t=> {
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 30,
            }
           ]
    };
    const result = statement(invoice, plays);
    t.is(result, 'Statement for BigCo\n' +
                  ' Hamlet: $400.00 (30 seats)\n' +
                  'Amount owed is $400.00\n' +
                  'You earned 0 credits \n');
});

test('statement test. Customer BigCo watch performance hamlet with 31 audiences', t=> {
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 31,
            }
           ]
    };
    const result = statement(invoice, plays);
    t.is(result, 'Statement for BigCo\n' +
                  ' Hamlet: $410.00 (31 seats)\n' +
                  'Amount owed is $410.00\n' +
                  'You earned 1 credits \n');
});


test('statement test. Customer BigCo watch performance as-like with 20 audiences', t=> {
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 20,
            }
           ]
    };
    const result = statement(invoice, plays);
    t.is(result, 'Statement for BigCo\n' +
                  ' As You Like It: $360.00 (20 seats)\n' +
                  'Amount owed is $360.00\n' +
                  'You earned 4 credits \n');
});


test('statement test. Customer BigCo watch performance as-like with 21 audiences', t=> {
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 21,
            }
           ]
    };
    const result = statement(invoice, plays);
    t.is(result, 'Statement for BigCo\n' +
                  ' As You Like It: $468.00 (21 seats)\n' +
                  'Amount owed is $468.00\n' +
                  'You earned 4 credits \n');
});


test('statement test. Customer BigCo watch no performance', t=> {
    const invoice = {
        'customer': 'BigCo',
        'performances': []
    };
    const result = statement(invoice, plays);
    t.is(result, 'Statement for BigCo\n' +
                  'Amount owed is $0.00\n' +
                  'You earned 0 credits \n');
});

test('statement test. Customer BigCo watch type tragedy1 hamlet with 20 audiences', t=> {
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 20,
            }
           ]
    };
    const plays = {
      'hamlet': {
        'name': 'Hamlet',
        'type': 'tragedy1',
      }
    };
    try {
        statement(invoice, plays);
    } catch(e) {
        t.is(e.message, 'unknown type: tragedy1');
    }
});




