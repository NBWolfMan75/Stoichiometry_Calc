# Stoichiometry Calculator Applet

A comprehensive, interactive web-based stoichiometry calculator designed for chemistry education. This applet helps students solve stoichiometry problems using dimensional analysis, including limiting reactant scenarios.

## Features

### 1. **Molar Mass Calculator**
   - Calculate molar masses of any chemical compound
   - Handles parentheses in formulas: e.g., Ca(OH)₂
   - Displays atomic breakdown with step-by-step calculation
   - Includes database of common elements

### 2. **Single Reactant Stoichiometry**
   - Solve basic stoichiometry problems using dimensional analysis
   - Visual display of conversion factors
   - Step-by-step calculation breakdown
   - Shows molar conversions and mass conversions

### 3. **Limiting Reactant Problem Solver**
   - Solve problems with multiple reactants
   - Automatically identifies limiting reactant
   - Calculates theoretical yield for each reactant
   - Optional percent yield calculation when actual yield is provided

### 4. **Percent Yield Calculator**
   - Calculate percent yield from theoretical and actual yields
   - Useful for lab reports and analysis

## How to Use

### For Students:
1. **Access the applet** via the URL provided by your instructor
2. **Select the problem type** from the tabs at the top
3. **Fill in all required fields** with your given data
4. **Click "Solve"** to see step-by-step solutions
5. **Copy or Print** results for your assignment

### For Instructors:
1. **Share the URL** directly from GitHub Pages with students
2. Students can access it from any device with a web browser
3. No installation or login required
4. Works offline (once loaded)

## Deployment Options

### Option 1: GitHub Pages (Recommended for LMS Integration)
1. Go to your repository Settings → Pages
2. Enable GitHub Pages with the main branch
3. The applet will be available at: `https://NBWolfMan75.github.io/Stoichiometry_Calc/`
4. Copy this URL into your LMS (Canvas, Blackboard, Google Classroom, etc.)

### Option 2: Local Installation
1. Download the files
2. Open `index.html` in any web browser
3. No server required

### Option 3: Self-Hosted
1. Upload the files to your web server
2. Ensure all three files are in the same directory:
   - `index.html`
   - `styles.css`
   - `script.js`

## Files Included

- **index.html** - Main HTML structure with all forms and tabs
- **styles.css** - Complete styling with responsive design and print support
- **script.js** - All calculation logic and functionality
- **README.md** - This documentation file

## Example Problems

### Single Reactant Example:
**Problem:** What mass of ammonia (NH₃) is produced when 6.00 grams of nitrogen gas (N₂) is reacted with an excess amount of hydrogen gas (H₂)?

**Input Data:**
- Balanced Reaction: N₂ + 3H₂ → 2NH₃
- Reactant: N₂(g), 6.00 g, Molar Mass: 28.01 g/mol
- Product: NH₃(g), Molar Mass: 17.03 g/mol
- Coefficients: 1 (N₂) → 2 (NH₃)

**Expected Answer:** 7.30 g NH₃

### Limiting Reactant Example:
**Problem:** Determine the mass of ammonia (NH₃) when 56 g of N₂(g) is reacted with 24 g of H₂(g).

**Input Data:**
- Balanced Reaction: N₂ + 3H₂ → 2NH₃
- Reactant 1: N₂(g), 56 g, Molar Mass: 28.01 g/mol, Coefficient: 1
- Reactant 2: H₂(g), 24 g, Molar Mass: 2.016 g/mol, Coefficient: 3
- Product: NH₃(g), Molar Mass: 17.03 g/mol, Coefficient: 2
- Actual Yield: 58 g

**Expected Answers:**
- Theoretical Yield from N₂: 68 g
- Theoretical Yield from H₂: 135 g
- Limiting Reactant: N₂(g)
- Percent Yield: 85.3%

## Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features for Student Learning

1. **Dimensional Analysis Display** - Shows exactly how conversions work
2. **Step-by-Step Breakdown** - Each calculation is broken down into manageable steps
3. **Color-Coded Results** - Easy to identify answers and key information
4. **Copy & Print** - Students can easily include results in assignments
5. **Error Handling** - Clear error messages guide users to correct mistakes

## Customization

### Adding Elements to Molar Mass Calculator:
Edit the `atomicMasses` object in `script.js`:
```javascript
const atomicMasses = {
    'H': 1.008,
    'C': 12.01,
    'N': 14.01,
    // Add more elements here
};
```

### Styling Changes:
Modify colors and layouts in `styles.css`. Main color scheme:
- Primary: `#667eea` (blue)
- Secondary: `#764ba2` (purple)
- Success: `#28a745` (green)

## Notes for Educators

- This tool teaches dimensional analysis methodology
- Students still learn by inputting data and understanding conversions
- Results show all intermediate steps for verification
- Supports formative assessment and homework help
- No calculator required (this tool IS the calculator)

## Technical Requirements

- Any modern web browser
- JavaScript enabled
- No backend server required
- Responsive design works on tablets and mobile devices

## Support & Troubleshooting

### Common Issues:

**Q: Calculator shows "Unknown element" error**
- A: Check spelling of element symbols (case-sensitive: N not n, Ca not ca)

**Q: Results not displaying**
- A: Ensure all required fields are filled in
- A: Check for proper decimal number format

**Q: Print doesn't work**
- A: Use browser print function (Ctrl+P or Cmd+P)
- A: Results are optimized for printing in portrait orientation

## Future Enhancements

Potential additions:
- Solution balancer (helps students balance equations)
- Electron transfer calculator for redox reactions
- Gas laws calculator
- Concentration calculation tools
- Downloadable PDF reports
- Problem library with practice problems

## License

This educational tool is free to use in classroom settings.

## Author

Created for chemistry education | NBWolfMan75

---

**Last Updated:** May 27, 2025
