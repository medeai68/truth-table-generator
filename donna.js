function implication(p, q) {
    return !p || q;
}

function negation(p) {
    return !p;
}

function conjunction(p, q) {
    return p && q;
}

function disjunction(p, q) {
    return p || q;
}

function evaluateExpression(expr, values) {
    // Replace variable names with true/false
    for (const [key, value] of Object.entries(values)) {
        const regex = new RegExp(`\\b${key}\\b`, 'gi');
        expr = expr.replace(regex, value ? 'true' : 'false');
    }

    // Replace logical symbols with JS equivalents
    expr = expr.replace(/¬/g, '!');     // Negation
    expr = expr.replace(/∧/g, '&&');    // Conjunction
    expr = expr.replace(/∨/g, '||');    // Disjunction

    // Replace implication with function call
    expr = expr.replace(/([A-Za-z()! ]+)\s*⇒\s*([A-Za-z()! ]+)/g, 'implication($1,$2)');

    try {
        return eval(expr);
    } catch (error) {
        console.error("Error evaluating expression:", expr, error);
        return false;
    }
}

// ✅ Extract every sub-expression step-by-step (fixed)
function extractSubExpressions(proposition) {
    const steps = new Set();

    // Remove spaces
    proposition = proposition.replace(/\s+/g, '');

    // Recursive search
    function findSubs(expr) {
        // Find innermost parentheses
        const inner = expr.match(/\([^()]+\)/g);
        if (inner) {
            inner.forEach(sub => {
                const clean = sub.replace(/[()]/g, '');
                steps.add(clean);
                findSubs(clean); // Recurse deeper
            });
        }

        // Match binary operations like p⇒q, p∧q, p∨q
        const binaries = expr.match(/[A-Za-z!()]+[∧∨⇒][A-Za-z!()]+/g);
        if (binaries) {
            binaries.forEach(sub => steps.add(sub));
        }
    }

    findSubs(proposition);
    steps.add(proposition); // Include full proposition

    return Array.from(steps);
}

// Insert logical symbol into input
function insertSymbol(symbol) {
    const propositionInput = document.getElementById('proposition');
    propositionInput.value += symbol;
}

// Generate full truth table
function generateTruthTable() {
    const truthTableBody = document.getElementById('truthTableBody');
    const variablesRow = document.getElementById('variablesRow');
    const proposition = document.getElementById('proposition').value.trim();

    if (!proposition) return;

    truthTableBody.innerHTML = '';
    variablesRow.innerHTML = '';

    const validVariables = ['p', 'q', 'r', 's', 't', 'u', 'v'];

    // Extract variables
    const variables = [...new Set(proposition.match(/[A-Za-z]/g))]
        .map(v => v.toLowerCase())
        .filter(v => validVariables.includes(v))
        .sort();

    // Extract sub-expressions (step-by-step)
    const subExpressions = extractSubExpressions(proposition);

    // Header row for variables
    variables.forEach(v => {
        const th = document.createElement('th');
        th.textContent = v;
        variablesRow.appendChild(th);
    });

    // Header for sub-expressions
    subExpressions.forEach(subExpr => {
        const th = document.createElement('th');
        th.textContent = subExpr;
        variablesRow.appendChild(th);
    });

    // Generate combinations of truth values
    const combinations = generateCombinations(variables.length);

    // Evaluate for each combination
    combinations.forEach(combination => {
        const row = document.createElement('tr');
        const valuesMap = {};

        // Assign variable truth values
        variables.forEach((v, index) => {
            valuesMap[v] = combination[index];
            valuesMap[v.toUpperCase()] = combination[index];

            const td = document.createElement('td');
            td.textContent = combination[index] ? 'T' : 'F';
            row.appendChild(td);
        });

        // Evaluate each sub-expression
        subExpressions.forEach(subExpr => {
            const result = evaluateExpression(subExpr, valuesMap);
            const resultTd = document.createElement('td');
            resultTd.textContent = result ? 'T' : 'F';
            row.appendChild(resultTd);
        });

        truthTableBody.appendChild(row);
    });
}

// Generate all possible truth combinations
function generateCombinations(n) {
    const combinations = [];
    for (let i = 0; i < Math.pow(2, n); i++) {
        const combo = [];
        for (let j = n - 1; j >= 0; j--) {
            combo.push(Boolean((i >> j) & 1));
        }
        combinations.push(combo);
    }
    return combinations;
}

// Auto-generate a table on load (optional)
window.onload = generateTruthTable;
