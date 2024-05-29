const fs = require('fs')
const path = require('path')
const { exit } = require('process')

// Path to the coverage-final.json file
const coverageFilePath = path.join(__dirname, '../coverage/coverage-final.json')

// Path to the coverage-summary.json file
const coverageSummaryPath = path.join(__dirname, 'coverage-summary.json')

// Read and parse the coverage JSON file
fs.readFile(coverageFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading coverage file:', err)
    exit(1)
  }

  const coverageData = JSON.parse(data)
  let totalStatements = 0
  let coveredStatements = 0
  let totalBranches = 0
  let coveredBranches = 0
  let totalFunctions = 0
  let coveredFunctions = 0
  let totalLines = 0
  let coveredLines = 0

  // Iterate through each file's coverage data
  for (const file in coverageData) {
    if (coverageData.hasOwnProperty(file)) {
      const fileCoverage = coverageData[file]

      // Statements
      totalStatements += Object.keys(fileCoverage.statementMap).length
      coveredStatements += Object.values(fileCoverage.s).filter((count) => count > 0).length

      // Branches
      totalBranches += Object.keys(fileCoverage.branchMap).length
      coveredBranches += Object.values(fileCoverage.b)
        .flat()
        .filter((count) => count > 0).length

      // Functions
      totalFunctions += Object.keys(fileCoverage.fnMap).length
      coveredFunctions += Object.values(fileCoverage.f).filter((count) => count > 0).length

      // Lines
      totalLines += Object.keys(fileCoverage.statementMap).length
      coveredLines += Object.values(fileCoverage.s).filter((count) => count > 0).length
    }
  }

  // Calculate overall coverage percentages
  const overallStatementCoverage = (coveredStatements / totalStatements) * 100
  const overallBranchCoverage = (coveredBranches / totalBranches) * 100
  const overallFunctionCoverage = (coveredFunctions / totalFunctions) * 100
  const overallLineCoverage = (coveredLines / totalLines) * 100

  const coverageSummary = {
    overallStatementCoverage: parseFloat(overallStatementCoverage.toFixed(3)),
    overallBranchCoverage: parseFloat(overallBranchCoverage.toFixed(3)),
    overallFunctionCoverage: parseFloat(overallFunctionCoverage.toFixed(3)),
    overallLineCoverage: parseFloat(overallLineCoverage.toFixed(3))
  }

  // Write the summary to coverage-summary.json
  fs.writeFile(coverageSummaryPath, JSON.stringify(coverageSummary, null, 2), (err) => {
    if (err) {
      console.error('Error writing coverage summary:', err)
      exit(1)
    }
  })

  // console.info('coveredStatements:', coveredStatements);
  // console.info('totalStatements:', totalStatements);
  // console.info('coveredBranches:', coveredBranches);
  // console.info('totalBranches:', totalBranches);
  // console.info('coveredFunctions:', coveredFunctions);
  // console.info('totalFunctions:', totalFunctions);
  // console.info('coveredLines:', coveredLines);
  // console.info('totalLines:', totalLines);

  console.log(`Overall statement coverage: ${overallStatementCoverage.toFixed(3)}%`)
  console.log(`Overall branch coverage: ${overallBranchCoverage.toFixed(3)}%`)
  console.log(`Overall function coverage: ${overallFunctionCoverage.toFixed(3)}%`)
  console.log(`Overall line coverage: ${overallLineCoverage.toFixed(3)}%`)
})
