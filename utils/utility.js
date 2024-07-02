/**
 * The idea of this file is to keep utility functions that are not connected to a specific component, and can be used
 * by multiple parts of the system.
 */

import { useMemo } from 'react'
import {
  MAX_OVERLAP,
  SEMESTER_FALL_END_DATE,
  SEMESTER_FALL_START_DATE,
  SEMESTER_SPRING_END_DATE,
  SEMESTER_SPRING_START_DATE,
  monthMapReverse
} from './globals'

/**
 * @description Takes a data file key and returns all unique values associated with that key as a set
 * @param {string} key a data file key
 * @param {JSON} data a JSON file with data
 * @returns an array of all unique values associated with the key as a memoized value
 * @example
 * // gets all unique course names from the data file and stores it in variable courseNames
 * let courseNames = getUniqueValuesByKey('name')
*/
export const getUniqueValuesByKey = (key, data) => useMemo(() => [...new Set(data?.map(item => item[key]))].sort())

/**
 * @description Takes some JSON data and a filter and dispatches a callback with the data where the
 * filter input matches the filter option property of the JSON data.
 * @param {JSON} data a JSON file with data
 * @param {JSON} filters an object containing all filter options as keys and their current input values as values
 * @param {*} callback the callback to fire with the found data
 * @example
 * // finds all courses that contain the string 'sustainable' in its name
 *
 * const dispatchFilters = (data) => {
 *   setFilteredCourses(data)
 * }
 *
 * handleSearch(courses, { creditsDecimal: 5, campus: 'Uppsala' }, dispatchFilters)
*/

export const handleFilter = (data, filters, callback) => {
  if (filters) {
    const filterOptions = Object.keys(filters)
    let result = data
    filterOptions.forEach((filter) => {
      result = runFilter(result, filter, filters[filter])
    })
    callback(result)
  } else {
    // No filters, we just callback with the original data
    callback(data)
  }
}

/**
 * @description Function that filters the dataset by start and end date.
 * @param {JSON} data The dataset to run the filter on
 * @param {string} filterParams The input that the filter should check against
 * @returns An array of the items that matches the filter.
 */
const monthFilter = (data, filterParams) => {
  const { semester, params } = filterParams
  if (params.length < 2) return data

  // helper function to make months such as january greater than december if semester is autumn
  const processEndMonth = (semester, monthNumber) => {
    if (semester === 'autumn' && monthNumber >= Number(SEMESTER_FALL_END_DATE.split('-')[1]) && monthNumber <= Number(SEMESTER_FALL_START_DATE.split('-')[1])) {
      return 12 + monthNumber
    } else {
      return monthNumber
    }
  }

  const DATE_RANGE = 'occurenceName'

  const filteredData = data.filter((item) => {
    const startDate = item[DATE_RANGE].split(' to ')[0]
    const startMonth = Number(startDate.split('-')[1])
    const endDate = item[DATE_RANGE].split(' to ')[1]
    const endMonth = processEndMonth(semester, Number(endDate.split('-')[1]))

    const inputStartMonth = params[0]
    const inputStartIdx = Number(monthMapReverse[inputStartMonth])
    const inputEndMonth = params[1]
    const inputEndIdx = processEndMonth(semester, Number(monthMapReverse[inputEndMonth]))
    // TODO: case where startMonth is in december and endMonth is in january (which is smaller than december)
    return startMonth >= inputStartIdx && endMonth <= inputEndIdx
  })

  return filteredData
}

/**
 * @description Function that filters the dataset by pure options, meaning options that can be
 * directly compared to the input.
 *
 * @param {JSON} data The dataset to run the filter on
 * @param {string} option The data point that the dataset is filtered by
 * @param {string} input The input that the filter should check against
 * @returns An array of the items that matches the filter.
 */

const pureFilter = (data, option, filterParams) => {
  const results = []

  filterParams.forEach((param) => {
    const filteredData = data.filter((item) => {
      return item[option] === param
    })
    results.push(...filteredData)
  })

  return results
}

/**
 * @description Function that filters the dataset by text options, meaning options that
 * are checked by doing string comparing.
 *
 * @param {JSON} data The dataset to run the filter on
 * @param {string} option The data point that the dataset is filtered by
 * @param {string} input The input that the filter should check against
 * @returns An array of the items that matches the filter.
 */

const textFilter = (data, option, filterParams) => {
  const results = []

  filterParams.forEach((param) => {
    const filteredData = data.filter((item) => {
      return item[option].toLowerCase().includes(param.toLowerCase())
    })
    results.push(...filteredData)
  })

  return results
}

// Runs the filter for the given option and input
const runFilter = (data, option, filterParams) => {
  // Filter options that can't be checked directly towards its input i.e non-pure filters
  const textFilterOptions = ['name', 'internationInstitution', 'period', 'occurenceName']

  if (!textFilterOptions.includes(option)) {
    return pureFilter(data, option, filterParams)
  }
  if (option === 'occurenceName') {
    return monthFilter(data, filterParams)
  } else {
    return textFilter(data, option, filterParams)
  }
}

// Checks if a given object is empty.
export const isObjectEmpty = (object) => {
  if (object && Object.keys(object).length === 0 && Object.getPrototypeOf(object) === Object.prototype) return true
  return false
}

/**
 * @description Takes a start and an end date and calculates the number of days between those days.
 * @param {string} startDate string in date format 'YYYY-MM-DD'
 * @param {string} endDate string in date format 'YYYY-MM-DD'
 * @returns the number of days between those dates
 */

export const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const differenceInTime = end.getTime() - start.getTime()
  const totalDays = Math.floor(differenceInTime / (1000 * 3600 * 24))
  return totalDays
}

/**
 * @description Extracts the start and end dates of a course
 * @param {JSON} course json object containing the course
 * @returns json object containing start and end date
 */
export const extractDates = (course) => {
  return {
    start: course.occurenceName.split(' ')[0],
    end: course.occurenceName.split(' ')[2]
  }
}

export const isCourseInArray = (code, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].code === code) {
      return true
    }
  }
  return false
}

export const findAllCoursesInList = (code, courseOverlaps) => {
  const coursesFound = []
  for (let i = 0; i < courseOverlaps.length; i++) {
    if (courseOverlaps[i].code === code) {
      coursesFound.push(courseOverlaps[i])
    }
  }
  return coursesFound
}

const daysInSemester = (semester) => {
  if (semester === 'autumn') {
    return calculateDays(SEMESTER_FALL_START_DATE, SEMESTER_FALL_END_DATE)
  }

  if (semester === 'spring') {
    return calculateDays(SEMESTER_SPRING_START_DATE, SEMESTER_SPRING_END_DATE)
  }
}

const getWidth = (course, semester) => {
  const dates = extractDates(course)
  const startDate = dates.start
  const endDate = dates.end

  const start = new Date(startDate)
  const end = new Date(endDate)
  const differenceInTime = end.getTime() - start.getTime()
  const width = Math.floor(differenceInTime / (1000 * 3600 * 24))
  const mappedWidth = Math.floor((width / daysInSemester(semester)) * 100)
  return mappedWidth
}

const getStart = (course, semester) => {
  const totalDays = daysInSemester(semester)
  const dates = extractDates(course)
  const start = new Date(dates.start)
  const startPercentage = Math.floor((start.getTime() - new Date(semester === 'autumn' ? SEMESTER_FALL_START_DATE : SEMESTER_SPRING_START_DATE).getTime()) / (1000 * 3600 * 24))
  const mappedStart = Math.floor((startPercentage / totalDays) * 100)
  return mappedStart
}

export const getCoords = (course, semester) => {
  const height = Number(course.creditsECTSDecimal)
  const width = getWidth(course, semester)
  const xStart = getStart(course, semester)
  const coords = {
    height,
    xStart,
    xEnd: xStart + width <= 100 ? xStart + width : 100, // So courses cannot be wider than container
    yStart: 0,
    yEnd: height
  }
  return coords
}

export const updateCoords = (scheduledCourses, semester) => {
  const updatedCoords = {}
  const adjustedCourses = []
  const courses = scheduledCourses.sort((course1, course2) => getWidth(course1, semester) - getWidth(course2, semester))

  const overlapAmt = (coords, coordsCmp) => (Math.max(0, Math.min(coords.xEnd, coordsCmp.xEnd) - Math.max(coords.xStart, coordsCmp.xStart)))

  courses.forEach(course => {
    const coords = getCoords(course, semester)
    courses.forEach(courseCmp => {
      const coordsCmp = getCoords(courseCmp, semester)
      const amt = overlapAmt(coords, coordsCmp)
      if (!adjustedCourses.includes(courseCmp.code) && courseCmp.code !== course.code) {
        if (amt >= MAX_OVERLAP) {
          adjustedCourses.push(course.code)
          coords.yStart += coordsCmp.height
          coords.yEnd += coordsCmp.height
        } else if (amt > 0) {
          adjustedCourses.push(course.code)
          coords.xEnd -= amt
        }
      }
    })
    updatedCoords[course.code] = coords
  })

  return updatedCoords
}

export const capitalFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const findUniqueStartingMonths = (courses) => {
  const uniqueStartingMonths = new Set()
  courses.forEach(c => uniqueStartingMonths.add(c.occurenceName.split('-')[1]))
  return uniqueStartingMonths
}

export const schedulePosition = (coords) => {
  return {
    position: 'absolute',
    bottom: coords.yStart + '%',
    left: coords.xStart + '%',
    width: coords.xEnd - coords.xStart + '%',
    height: coords.yEnd - coords.yStart - 1 + '%' // -1 to create a bit of padding
  }
}
