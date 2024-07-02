const fs = require('fs')

export const uploadRepo = {
  saveData,
  restoreBackup
}

/**
 * function saveData(data, semester) {
  const env = process.env.NODE_ENV
  const isDev = env === 'development'

  // Check if a valid semester was provided
  if (!['Autumn', 'Spring'].includes(semester)) {
    return false
  }

  const sourcePath = `./${isDev ? 'data' : 'prod'}/testData${semester}.json`
  const backupPath = `./${isDev ? 'data' : 'prod'}/backup${semester}.json`
  const targetPath = `./${isDev ? 'data' : 'prod'}/courseData${semester}.json`

  fs.copyFileSync(sourcePath, backupPath)
  fs.writeFileSync(targetPath, JSON.stringify(data, null, 2))
  return true
}
**/

function saveData (data, semester) {
  const env = process.env.NODE_ENV
  if (env === 'development') {
    if (semester === 'Autumn') {
      fs.copyFileSync('./data/testDataAutumn.json', './data/backupAutumn.json')
      fs.writeFileSync('./data/testDataAutumn.json', JSON.stringify(data, null, 2))
      return true
    }
    if (semester === 'Spring') {
      fs.copyFileSync('./data/testDataSpring.json', './data/backupSpring.json')
      fs.writeFileSync('./data/testDataSpring.json', JSON.stringify(data, null, 2))
      return true
    } else {
      // There was no semester, we throw an error
      return false
    }
  }
  if (env === 'production') {
    if (semester === 'Autumn') {
      fs.copyFileSync('./data/courseDataAutumn.json', './prod/backupAutumn.json')
      fs.writeFileSync('./prod/courseDataAutumn.json', JSON.stringify(data, null, 2))
      return true
    }
    if (semester === 'Spring') {
      fs.copyFileSync('./prod/courseDataSpring.json', './prod/backupSpring.json')
      fs.writeFileSync('./prod/courseDataSpring.json', JSON.stringify(data, null, 2))
      return true
    } else {
      // There was no semester, we throw an error
      return false
    }
  }
}

/*

function restoreBackup (semester) {
    const env = process.env.NODE_ENV
    const src = `./${env === 'development' ? 'data' : 'prod'}/backup${semester}.json`
    const dest = `./${env === 'development' ? 'data' : 'prod'}/testData${semester}.json`

    if (semester === 'Autumn' || semester === 'Spring') {
        fs.copyFileSync(src, dest)
        return true
    }
    return false
}

*/

function restoreBackup (semester) {
  const env = process.env.NODE_ENV

  if (env === 'development') {
    if (semester === 'Autumn') {
      fs.copyFileSync('./data/backupAutumn.json', './data/testDataAutumn.json')
      return true
    }
    if (semester === 'Spring') {
      fs.copyFileSync('./data/backupSpring.json', './data/testDataSpring.json')
      return true
    } else {
      return false
    }
  }
  if (env === 'production') {
    if (semester === 'Autumn') {
      fs.copyFileSync('./prod/backupAutumn.json', './prod/courseDataAutumn.json')
      return true
    }
    if (semester === 'Spring') {
      fs.copyFileSync('./prod/backupSpring.json', './prod/courseDataSpring.json')
      return true
    } else {
      return false
    }
  }
}
