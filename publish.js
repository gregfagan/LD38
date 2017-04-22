const child_process = require('child_process')

// First see if the working set is empty
child_process.exec('git status -s', {}, (error, stdout, stderr) => {
  if (error) {
    console.log(error, stderr)
  }

  if (stdout.length !== 0) {
    console.error('Error: working set not empty')
    return
  }

  const commands = [
    'npm run build',
    'git checkout -B gh-pages',
    'git add -f build',
    'git commit -am "Rebuild"',
    'git filter-branch -f --prune-empty --subdirectory-filter build',
    'git push -f origin gh-pages',
    'git checkout -',
  ]

  for (const command of commands) {
    child_process.execSync(command)
  }
})
