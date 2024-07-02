const fs = require('fs')
const htmlEntities = require('html-entities')

export const preprocessing = { runPreprocessing, commitData, restoreBackup }

const preprocess = (jsonData, outputFile) => {
  const processedData = jsonData.map(obj => {
    const academicPeriod = obj.academicPeriodName
    const year = academicPeriod.slice(0, 4)
    const period = obj.period.toLowerCase()

    if (period === 'p') {
      obj.period = 'First cycle'
    } else if (period === 'v') {
      obj.period = 'Second cycle'
    } else if (period === 'g') {
      obj.period = 'General entry requirements'
    }

    // remove non-numeric characters from creditsECTSDecimal
    obj.creditsECTSDecimal = obj.creditsECTSDecimal.match(/\d+/g).join('')

    delete obj.remarks
    delete obj.language
    delete obj.durationAcademicPeriods
    delete obj.teacher
    delete obj.externalID
    delete obj.pleaseNote
    delete obj.syllabus

    return obj
  }).filter(Boolean) // Remove null elements

  return processedData
}

const translateEntities = (jsonData) => {
  const removeHtmlEntities = (data) => {
    if (typeof data === 'object') {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          data[key] = removeHtmlEntities(data[key])
        }
      }
    } else if (Array.isArray(data)) {
      data.forEach((item, index) => {
        data[index] = removeHtmlEntities(item)
      })
    } else if (typeof data === 'string') {
      data = htmlEntities.decode(data)
    }
    return data
  }

  return removeHtmlEntities(jsonData)
}

const removeHtmlTags = (jsonData) => {
  const removeHtmlTagsFromString = (text) => {
    const clean = /<.*?>/g
    return text.replace(clean, '')
  }

  jsonData.forEach((course) => {
    for (const key in course) {
      if (typeof course[key] === 'string') {
        course[key] = removeHtmlTagsFromString(course[key])
      }
    }
  })

  return jsonData
}

const splitBySemesterAndLocation = (jsonData) => {
  const uppsala_autumn = jsonData.filter((obj) => (obj.campus.toLowerCase() === 'uppsala' || obj.campus.toLowerCase() === 'flexible') && obj.academicPeriodName.toLowerCase().includes('autumn'))
  const uppsala_spring = jsonData.filter((obj) => (obj.campus.toLowerCase() === 'uppsala' || obj.campus.toLowerCase() === 'flexible') && obj.academicPeriodName.toLowerCase().includes('spring'))
  const visby_autumn = jsonData.filter((obj) => (obj.campus.toLowerCase() === 'visby' || obj.campus.toLowerCase() === 'gotland' || obj.campus.toLowerCase() === 'flexible') && obj.academicPeriodName.toLowerCase().includes('autumn'))
  const visby_spring = jsonData.filter((obj) => (obj.campus.toLowerCase() === 'visby' || obj.campus.toLowerCase() === 'gotland' || obj.campus.toLowerCase() === 'flexible') && obj.academicPeriodName.toLowerCase().includes('spring'))

  return {
    uppsala_autumn,
    uppsala_spring,
    visby_autumn,
    visby_spring
  }
}

/**
 *
 * @param {*} inputJSON - the input JSON object to be processed
 * @param {*} year - the year of the first semester in string format
 */
function runPreprocessing (inputJSON) {
  try {
    let processedData = preprocess(inputJSON)
    processedData = translateEntities(processedData)
    processedData = removeHtmlTags(processedData)
    return splitBySemesterAndLocation(processedData)
  } catch (error) {
    console.error(error)
    return null
  }
}

function createBackup () {
  try {
    const files = fs.readdirSync('./data')
    const backupFolder = './data/backup'
    if (!fs.existsSync(backupFolder)) {
      fs.mkdirSync(backupFolder)
    }
    files.forEach(file => {
      if (file === 'backup') return
      return fs.copyFileSync(`./data/${file}`, `./data/backup/${file}`)
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

function restoreBackup () {
  try {
    const files = fs.readdirSync('./data/backup')
    files.forEach(file => {
      fs.copyFileSync(`./data/backup/${file}`, `./data/${file}`)
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

function commitData (data, year, semester) {
  try {
    createBackup()
    switch (semester.toLowerCase()) {
      case 'autumn':
        fs.writeFileSync(`./data/uppsala_autumn_${year}.json`, JSON.stringify(data.uppsala_autumn, null, 2))
        fs.writeFileSync(`./data/visby_autumn_${year}.json`, JSON.stringify(data.visby_autumn, null, 2))
        break
      case 'spring':
        fs.writeFileSync(`./data/uppsala_spring_${String(Number(year) + 1)}.json`, JSON.stringify(data.uppsala_spring, null, 2))
        fs.writeFileSync(`./data/visby_spring_${String(Number(year) + 1)}.json`, JSON.stringify(data.visby_spring, null, 2))
        break
    }
  } catch (error) {
    console.error(error)
  }
}
