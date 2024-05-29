const fs = require('fs');
const path = require('path');

// Path to the coverage-final.json file
const coverageFilePath = path.join(__dirname, 'coverage', 'coverage-final.json');

// Read and parse the coverage JSON file
fs.readFile(coverageFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading coverage file:', err);
        return;
    }

    const coverageData = JSON.parse(data);
    let totalStatements = 0;
    let coveredStatements = 0;
    let totalBranches = 0;
    let coveredBranches = 0;
    let totalFunctions = 0;
    let coveredFunctions = 0;
    let totalLines = 0;
    let coveredLines = 0;

    // Iterate through each file's coverage data
    for (const file in coverageData) {
        if (coverageData.hasOwnProperty(file)) {
            const fileCoverage = coverageData[file];

            // Statements: executable statements, such as variable declarations, assignments, and expressions...
            totalStatements += Object.keys(fileCoverage.statementMap).length;
            coveredStatements += Object.values(fileCoverage.s).filter(count => count > 0).length;

            // Branches: points in the code where the execution path can diverge, typically due to conditionals (if-else, switch statements...)
            totalBranches += Object.keys(fileCoverage.branchMap).length;
            coveredBranches += Object.values(fileCoverage.b).flat().filter(count => count > 0).length;

            // Functions: blocks of code that are defined and can be called, including function declarations, expressions, and arrow functions.
            totalFunctions += Object.keys(fileCoverage.fnMap).length;
            coveredFunctions += Object.values(fileCoverage.f).filter(count => count > 0).length;

            // Lines: the number of lines of code that are covered by tests. 
            // In the context of coverage reports, this is often equivalent to statements.
            totalLines += Object.keys(fileCoverage.statementMap).length;
            coveredLines += Object.values(fileCoverage.s).filter(count => count > 0).length;
        }
    }

    // Calculate overall coverage percentages
    const overallStatementCoverage = (coveredStatements / totalStatements) * 100;
    const overallBranchCoverage = (coveredBranches / totalBranches) * 100;
    const overallFunctionCoverage = (coveredFunctions / totalFunctions) * 100;
    const overallLineCoverage = (coveredLines / totalLines) * 100;

    // console.warn('coveredStatements:', coveredStatements);
    // console.warn('totalStatements:', totalStatements);
    // console.warn('coveredBranches:', coveredBranches);
    // console.warn('totalBranches:', totalBranches);
    // console.warn('coveredFunctions:', coveredFunctions);
    // console.warn('totalFunctions:', totalFunctions);
    // console.warn('coveredLines:', coveredLines);
    // console.warn('totalLines:', totalLines);


    console.log(`Overall statement coverage: ${overallStatementCoverage.toFixed(3)}%`);
    console.log(`Overall branch coverage: ${overallBranchCoverage.toFixed(3)}%`);
    console.log(`Overall function coverage: ${overallFunctionCoverage.toFixed(3)}%`);
    console.log(`Overall line coverage: ${overallLineCoverage.toFixed(3)}%`);
});
