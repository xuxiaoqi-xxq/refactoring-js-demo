const test = require('ava')
const {statementHtml} = require('../src/statement');
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

test('statementHtml test. Customer BigCo watch performance hamlet with 30 audiences', t=> {
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 30,
            }
        ]
    };
    const result = statementHtml(invoice, plays);
    t.is(result, '<h1>Statement for BigCo</h1>\n' +
                         '<table>\n' +
                         '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
                         ' <tr><td>Hamlet</td><td>30</td><td>$400.00</td></tr>\n' +
                         '</table>\n' +
                         '<p>Amount owed is <em>$400.00</em></p>\n' +
                         '<p>You earned <em>0</em> credits</p>\n');
});

test('statementHtml test. Customer BigCo watch performance hamlet with 31 audiences', t=> {
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 31,
            }
           ]
    };
    const result = statementHtml(invoice, plays);
    t.is(result, '<h1>Statement for BigCo</h1>\n' +
                         '<table>\n' +
                         '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
                         ' <tr><td>Hamlet</td><td>31</td><td>$410.00</td></tr>\n' +
                         '</table>\n' +
                         '<p>Amount owed is <em>$410.00</em></p>\n' +
                         '<p>You earned <em>1</em> credits</p>\n');
});

test('statementHtml test. Customer BigCo watch performance as-like with 20 audiences', t=> {
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 20,
            }
           ]
    };
    const result = statementHtml(invoice, plays);
    t.is(result, '<h1>Statement for BigCo</h1>\n' +
                         '<table>\n' +
                         '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
                         ' <tr><td>As You Like It</td><td>20</td><td>$360.00</td></tr>\n' +
                         '</table>\n' +
                         '<p>Amount owed is <em>$360.00</em></p>\n' +
                         '<p>You earned <em>4</em> credits</p>\n');
});

test('statementHtml test. Customer BigCo watch performance as-like with 21 audiences', t=> {
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 21,
            }
           ]
    };
    const result = statementHtml(invoice, plays);
    t.is(result, '<h1>Statement for BigCo</h1>\n' +
                         '<table>\n' +
                         '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
                         ' <tr><td>As You Like It</td><td>21</td><td>$468.00</td></tr>\n' +
                         '</table>\n' +
                         '<p>Amount owed is <em>$468.00</em></p>\n' +
                         '<p>You earned <em>4</em> credits</p>\n');
});

test('statementHtml test. Customer BigCo watch no performance', t=> {
    const invoice = {
        'customer': 'BigCo',
        'performances': []
    };
    const result = statementHtml(invoice, plays);
    t.is(result, '<h1>Statement for BigCo</h1>\n' +
                         '<table>\n' +
                         '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
                         '</table>\n' +
                         '<p>Amount owed is <em>$0.00</em></p>\n' +
                         '<p>You earned <em>0</em> credits</p>\n');
});

test('statementHtml test. Customer BigCo watch type tragedy1 hamlet with 20 audiences', t=> {
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
        statementHtml(invoice, plays);
    } catch(e) {
        t.is(e.message, 'unknown type: tragedy1');
    }
});