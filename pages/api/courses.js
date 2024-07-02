import fs from 'fs'
import path from 'path'

function readDataFile (path) {
  const fileContents = fs.readFileSync(path, 'utf8')
  const data = JSON.parse(fileContents)
  return data
}

/*
  This API handler is used for responding to the requested semester/location data.
  The requester sends a query including the semester and location to the endpoint and the server responds with
  the correct data file. If one of the parameters are invalid the server responds with an error.
*/

export default function handler (req, res) {
  const { semester, location } = req.query

  if (!semester || !location) {
    return res.status(400).json({ error: 'Missing required parameters.' })
  }

  let filePath
  if (semester === 'autumn' && location === 'uppsala') {
    filePath = path.join(process.cwd(), 'data', 'uppsala_autumn_2023.json')
  } else if (semester === 'autumn' && location === 'visby') {
    filePath = path.join(process.cwd(), 'data', 'visby_autumn_2023.json')
  } else if (semester === 'spring' && location === 'uppsala') {
    filePath = path.join(process.cwd(), 'data', 'uppsala_spring_2024.json')
  } else if (semester === 'spring' && location === 'visby') {
    filePath = path.join(process.cwd(), 'data', 'visby_spring_2024.json')
  } else {
    return res.status(400).json({ error: 'Invalid parameters.' })
  }

  const data = readDataFile(filePath)

  return res.status(200).json(data)
}
