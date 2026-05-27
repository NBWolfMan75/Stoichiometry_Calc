// Atomic Masses Database
const atomicMasses = {
    'H': 1.008,
    'C': 12.01,
    'N': 14.01,
    'O': 16.00,
    'P': 30.97,
    'S': 32.07,
    'Cl': 35.45,
    'Ca': 40.08,
    'Fe': 55.85,
    'Cu': 63.55,
    'Zn': 65.39,
    'Br': 79.90,
    'Ag': 107.87,
    'I': 126.90,
    'Ba': 137.33,
    'Pb': 207.20
};

// Tab Navigation
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        switchTab(tabName);
    });
});

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Deactivate all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Activate selected button
    event.target.classList.add('active');
}

// ==================== MOLAR MASS CALCULATOR ====================
function parseChemicalFormula(formula) {
    const regex = /([A-Z][a-z]?)(\d*)/g;
    const atoms = {};
    let match;
    
    // Handle parentheses
    formula = formula.replace(/\(([^)]+)\)(\d*)/g, (fullMatch, group, count) => {
        count = parseInt(count) || 1;
        return group.repeat(count);
    });
    
    while ((match = regex.exec(formula)) !== null) {
        const element = match[1];
        const count = parseInt(match[2]) || 1;
        atoms[element] = (atoms[element] || 0) + count;
    }
    
    return atoms;
}

function calculateMolarMass() {
    const formula = document.getElementById('formula-input').value.trim();
    
    if (!formula) {
        alert('Please enter a chemical formula');
        return;
    }
    
    try {
        const atoms = parseChemicalFormula(formula);
        let molarMass = 0;
        let breakdown = `<strong>Formula: ${formula}</strong><br><br>`;
        breakdown += `<table style="width:100%; border-collapse: collapse;"><tr style="background: #f0f0f0;"><th style="border: 1px solid #ddd; padding: 8px;">Element</th><th style="border: 1px solid #ddd; padding: 8px;">Count</th><th style="border: 1px solid #ddd; padding: 8px;">Atomic Mass</th><th style="border: 1px solid #ddd; padding: 8px;">Subtotal</th></tr>`;
        
        for (const [element, count] of Object.entries(atoms)) {
            if (!atomicMasses[element]) {
                throw new Error(`Unknown element: ${element}`);
            }
            const subtotal = atomicMasses[element] * count;
            molarMass += subtotal;
            breakdown += `<tr><td style="border: 1px solid #ddd; padding: 8px;">${element}</td><td style="border: 1px solid #ddd; padding: 8px;">${count}</td><td style="border: 1px solid #ddd; padding: 8px;">${atomicMasses[element].toFixed(3)}</td><td style="border: 1px solid #ddd; padding: 8px;">${subtotal.toFixed(3)}</td></tr>`;
        }
        
        breakdown += `</table><br><strong>Molar Mass = ${molarMass.toFixed(2)} g/mol</strong>`;
        
        document.getElementById('mm-output').innerHTML = breakdown;
        document.getElementById('molar-mass-result').style.display = 'block';
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// ==================== SINGLE REACTANT SOLVER ====================
function solveSingleReactant() {
    const reaction = document.getElementById('sr-reaction').value.trim();
    const reactantName = document.getElementById('sr-reactant-name').value.trim();
    const reactantMass = parseFloat(document.getElementById('sr-reactant-mass').value);
    const reactantMM = parseFloat(document.getElementById('sr-reactant-mm').value);
    const productName = document.getElementById('sr-product-name').value.trim();
    const productMM = parseFloat(document.getElementById('sr-product-mm').value);
    const reactantCoeff = parseFloat(document.getElementById('sr-reactant-coeff').value);
    const productCoeff = parseFloat(document.getElementById('sr-product-coeff').value);
    
    if (!reaction || !reactantName || !productName || isNaN(reactantMass) || isNaN(reactantMM) || isNaN(productMM)) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Calculation steps
    const moles1 = reactantMass / reactantMM;
    const moles2 = moles1 * (productCoeff / reactantCoeff);
    const productMass = moles2 * productMM;
    
    let output = `<div class="calculation-step">
        <h4>Given Information:</h4>
        <p><strong>Balanced Reaction:</strong> ${reaction}</p>
        <p><strong>Starting Mass of ${reactantName}:</strong> ${reactantMass} g</p>
        <p><strong>Molar Mass of ${reactantName}:</strong> ${reactantMM} g/mol</p>
        <p><strong>Molar Mass of ${productName}:</strong> ${productMM} g/mol</p>
    </div>`;
    
    output += `<div class="calculation-step">
        <h4>Dimensional Analysis Setup:</h4>
        <div class="dimensional-analysis">
(${reactantMass} g ${reactantName})/1 × (1 mol ${reactantName})/(${reactantMM} g ${reactantName}) × (${productCoeff} mol ${productName})/(${reactantCoeff} mol ${reactantName}) × (${productMM} g ${productName})/(1 mol ${productName}) = ${productMass.toFixed(2)} g ${productName}
        </div>
    </div>`;
    
    output += `<div class="calculation-step">
        <h4>Step-by-Step Calculation:</h4>
        <p><strong>Step 1:</strong> Convert grams of ${reactantName} to moles<br>
        ${reactantMass} g ÷ ${reactantMM} g/mol = ${moles1.toFixed(4)} mol ${reactantName}</p>
        <p><strong>Step 2:</strong> Use stoichiometry ratio to find moles of ${productName}<br>
        ${moles1.toFixed(4)} mol ${reactantName} × (${productCoeff} mol ${productName} / ${reactantCoeff} mol ${reactantName}) = ${moles2.toFixed(4)} mol ${productName}</p>
        <p><strong>Step 3:</strong> Convert moles of ${productName} to grams<br>
        ${moles2.toFixed(4)} mol × ${productMM} g/mol = ${productMass.toFixed(2)} g ${productName}</p>
    </div>`;
    
    output += `<div class="calculation-step" style="background: #d4edda; border-left-color: #28a745;">
        <h4 style="color: #155724;">Answer:</h4>
        <p style="font-size: 1.2em; color: #155724;"><strong>${productMass.toFixed(2)} g ${productName}</strong></p>
    </div>`;
    
    document.getElementById('sr-output').innerHTML = output;
    document.getElementById('sr-result').style.display = 'block';
    document.getElementById('sr-result').scrollIntoView({ behavior: 'smooth' });
}

// ==================== LIMITING REACTANT SETUP ====================
function addReactantField() {
    const container = document.getElementById('lr-reactants-container');
    const count = container.children.length + 1;
    
    const field = document.createElement('div');
    field.className = 'form-group reactant-field';
    field.id = `reactant-field-${count}`;
    field.innerHTML = `
        <label for="lr-reactant${count}-name">Reactant ${count} Name (with phase):</label>
        <input type="text" id="lr-reactant${count}-name" class="lr-reactant-name" placeholder="e.g., N2(g)">
        
        <label for="lr-reactant${count}-mass">Starting Mass (grams):</label>
        <input type="number" id="lr-reactant${count}-mass" class="lr-reactant-mass" placeholder="e.g., 56" step="0.01">
        
        <label for="lr-reactant${count}-mm">Molar Mass (g/mol):</label>
        <input type="number" id="lr-reactant${count}-mm" class="lr-reactant-mm" placeholder="e.g., 28.01" step="0.01">
        
        <label for="lr-reactant${count}-coeff">Coefficient in Balanced Equation:</label>
        <input type="number" id="lr-reactant${count}-coeff" class="lr-reactant-coeff" placeholder="e.g., 1" value="1" step="1">
        
        ${count > 1 ? `<button onclick="removeReactantField(${count})" style="background: #dc3545; width: auto; margin-top: 10px;">Remove Reactant</button>` : ''}
    `;
    
    container.appendChild(field);
}

function removeReactantField(count) {
    const field = document.getElementById(`reactant-field-${count}`);
    if (field) {
        field.remove();
    }
}

// Initialize first reactant field for limiting reactant
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('lr-reactants-container');
    if (container && container.children.length === 0) {
        addReactantField();
        addReactantField();
    }
});

// ==================== LIMITING REACTANT SOLVER ====================
function solveLimitingReactant() {
    const reaction = document.getElementById('lr-reaction').value.trim();
    const productName = document.getElementById('lr-product-name').value.trim();
    const productMM = parseFloat(document.getElementById('lr-product-mm').value);
    const productCoeff = parseFloat(document.getElementById('lr-product-coeff').value);
    const actualYield = document.getElementById('lr-actual-yield').value ? parseFloat(document.getElementById('lr-actual-yield').value) : null;
    
    if (!reaction || !productName || isNaN(productMM)) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Collect reactant data
    const reactants = [];
    document.querySelectorAll('.reactant-field').forEach((field, index) => {
        const name = field.querySelector('.lr-reactant-name').value.trim();
        const mass = parseFloat(field.querySelector('.lr-reactant-mass').value);
        const mm = parseFloat(field.querySelector('.lr-reactant-mm').value);
        const coeff = parseFloat(field.querySelector('.lr-reactant-coeff').value);
        
        if (name && !isNaN(mass) && !isNaN(mm) && !isNaN(coeff)) {
            reactants.push({ name, mass, mm, coeff });
        }
    });
    
    if (reactants.length < 2) {
        alert('Please enter at least 2 reactants for limiting reactant problem');
        return;
    }
    
    // Calculate theoretical yields for each reactant
    const yields = [];
    reactants.forEach((reactant, index) => {
        const moles1 = reactant.mass / reactant.mm;
        const moles2 = moles1 * (productCoeff / reactant.coeff);
        const mass = moles2 * productMM;
        yields.push({
            reactant: reactant.name,
            mass: reactant.mass,
            mm: reactant.mm,
            moles1,
            coeff: reactant.coeff,
            moles2,
            productMass: mass
        });
    });
    
    // Find limiting reactant
    const limitingIndex = yields.reduce((min, current, index) => 
        current.productMass < yields[min].productMass ? index : min, 0);
    const limitingReactant = yields[limitingIndex].reactant;
    const theoreticalYield = yields[limitingIndex].productMass;
    
    // Build output
    let output = `<div class="calculation-step">
        <h4>Given Information:</h4>
        <p><strong>Balanced Reaction:</strong> ${reaction}</p>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Molar Mass of ${productName}:</strong> ${productMM} g/mol</p>
        <p><strong>Coefficient of ${productName}:</strong> ${productCoeff}</p>
    </div>`;
    
    output += `<div class="calculation-step">
        <h4>Reactant Information:</h4>
        <table class="limiting-reactant-table">
            <tr><th>Reactant</th><th>Mass (g)</th><th>Molar Mass (g/mol)</th><th>Coefficient</th></tr>`;
    
    reactants.forEach(r => {
        output += `<tr><td>${r.name}</td><td>${r.mass}</td><td>${r.mm}</td><td>${r.coeff}</td></tr>`;
    });
    
    output += `</table></div>`;
    
    // Calculations for each reactant
    yields.forEach((y, index) => {
        output += `<div class="calculation-step">
            <h4>Reactant ${index + 1}: ${y.reactant}</h4>
            <div class="dimensional-analysis">
(${y.mass} g ${y.reactant})/1 × (1 mol ${y.reactant})/(${y.mm} g ${y.reactant}) × (${productCoeff} mol ${productName})/(${y.coeff} mol ${y.reactant}) × (${productMM} g ${productName})/(1 mol ${productName}) = ${y.productMass.toFixed(2)} g ${productName}
            </div>
            <p><strong>Theoretical Yield from ${y.reactant}:</strong> ${y.productMass.toFixed(2)} g ${productName}</p>
        </div>`;
    });
    
    output += `<div class="calculation-step" style="background: #fff3cd; border-left-color: #ff9800;">
        <h4 style="color: #856404;">Limiting Reactant Analysis:</h4>
        <table class="limiting-reactant-table">
            <tr><th>Reactant</th><th>Theoretical Yield of ${productName} (g)</th></tr>`;
    
    yields.forEach((y, index) => {
        const isLimiting = index === limitingIndex;
        const bgColor = isLimiting ? '#ffe0e0' : '#f9f9f9';
        output += `<tr style="background: ${bgColor};"><td><strong>${y.reactant}${isLimiting ? ' (LIMITING)' : ''}</strong></td><td><strong>${y.productMass.toFixed(2)}</strong></td></tr>`;
    });
    
    output += `</table>
        <p style="margin-top: 15px;"><strong>The limiting reactant is: ${limitingReactant}</strong></p>
        <p><strong>Theoretical Yield of ${productName}: ${theoreticalYield.toFixed(2)} g</strong></p>
    </div>`;
    
    // Percent yield if actual yield provided
    if (actualYield !== null && !isNaN(actualYield)) {
        const percentYield = (actualYield / theoreticalYield) * 100;
        output += `<div class="calculation-step">
            <h4>Percent Yield Calculation:</h4>
            <div class="dimensional-analysis">
% Yield = (${actualYield} g ${productName})/(${theoreticalYield.toFixed(2)} g ${productName}) × 100% = ${percentYield.toFixed(2)}%
            </div>
            <p><strong>Actual Yield:</strong> ${actualYield} g ${productName}</p>
            <p><strong>Percent Yield:</strong> ${percentYield.toFixed(2)}%</p>
        </div>`;
    }
    
    document.getElementById('lr-output').innerHTML = output;
    document.getElementById('lr-result').style.display = 'block';
    document.getElementById('lr-result').scrollIntoView({ behavior: 'smooth' });
}

// ==================== PERCENT YIELD CALCULATOR ====================
function calculatePercentYield() {
    const productName = document.getElementById('py-product-name').value.trim();
    const theoreticalYield = parseFloat(document.getElementById('py-theoretical-yield').value);
    const actualYield = parseFloat(document.getElementById('py-actual-yield').value);
    
    if (!productName || isNaN(theoreticalYield) || isNaN(actualYield)) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (theoreticalYield === 0) {
        alert('Theoretical yield cannot be zero');
        return;
    }
    
    const percentYield = (actualYield / theoreticalYield) * 100;
    
    let output = `<div class="calculation-step">
        <h4>Given Information:</h4>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Theoretical Yield:</strong> ${theoreticalYield} g</p>
        <p><strong>Actual Yield:</strong> ${actualYield} g</p>
    </div>`;
    
    output += `<div class="calculation-step">
        <h4>Percent Yield Formula:</h4>
        <div class="dimensional-analysis">
% Yield = (Actual Yield / Theoretical Yield) × 100%
        </div>
    </div>`;
    
    output += `<div class="calculation-step">
        <h4>Calculation:</h4>
        <div class="dimensional-analysis">
% Yield = (${actualYield} g ${productName} / ${theoreticalYield} g ${productName}) × 100%
        </div>
    </div>`;
    
    output += `<div class="calculation-step" style="background: #d4edda; border-left-color: #28a745;">
        <h4 style="color: #155724;">Result:</h4>
        <p style="font-size: 1.3em; color: #155724;"><strong>% Yield = ${percentYield.toFixed(2)}%</strong></p>
    </div>`;
    
    document.getElementById('py-output').innerHTML = output;
    document.getElementById('py-result').style.display = 'block';
    document.getElementById('py-result').scrollIntoView({ behavior: 'smooth' });
}

// ==================== UTILITY FUNCTIONS ====================
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.innerText;
    
    navigator.clipboard.writeText(text).then(function() {
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = '#28a745';
        
        setTimeout(function() {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(function(err) {
        alert('Failed to copy: ' + err);
    });
}
