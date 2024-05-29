const fs = require('fs')
const path = require('path')

const newCoveragePath = path.join(__dirname, 'coverage-summary.json')
const oldCoveragePath = path.join(__dirname, 'coverage-summary-old.json')

// Read the new coverage summary
const newCoverage = JSON.parse(fs.readFileSync(newCoveragePath, 'utf8'))

// Check if old coverage summary exists
if (!fs.existsSync(oldCoveragePath)) {
  console.info(
    'Old coverage summary does not exist. Renaming new coverage summary to old coverage summary. Pass without checking.'
  )
  process.exit(0)
}

// Read the old coverage summary
const oldCoverage = JSON.parse(fs.readFileSync(oldCoveragePath, 'utf8'))

const columns = ['overallStatementCoverage', 'overallBranchCoverage', 'overallFunctionCoverage', 'overallLineCoverage']
const failedColumns = []

// Compare coverage values
columns.forEach((column) => {
  console.log(`new ${column}: ${newCoverage[column]}%`)
  console.log(`old ${column}: ${oldCoverage[column]}%`)
  if (newCoverage[column] < oldCoverage[column]) {
    failedColumns.push(column)
  }
})

if (failedColumns.length > 0) {
  console.error(`Coverage has decreased in the following columns: ${failedColumns.join(', ')}`)
  process.exit(1)
} else {
  console.info('Coverage check passed.')
  process.exit(0)
}
