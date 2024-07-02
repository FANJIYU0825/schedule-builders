import UploadForm from '../components/upload/UploadForm'
import styles from '../styles/UploadForm.module.css'
import { useState, useRef, useEffect } from 'react'
import UploadOptionSelect from '../components/upload/UploadOptionSelect'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../styles/theme'
import { Grid, Stack, Typography } from '@mui/material'
import UploadNavbar from '../components/upload/UploadNavbar'
import UploadedFilesList from '../components/upload/UploadedFilesList'
import HelpIcon from '@mui/icons-material/Help'
import UploadHelper from '../components/upload/UploadHelper'
import MainButton from '../components/misc/MainButton'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import RestoreIcon from '@mui/icons-material/Restore'
import { csv2json } from 'csvjson-csv2json'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

export const getServerSideProps = withPageAuthRequired()

export default function Upload () {
  const router = useRouter()
  const { user, error, isLoading } = useUser()
  const [success, setSuccess] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [semester, setSemester] = useState('')
  const [files, setFiles] = useState([])
  const [openHelper, setOpenHelper] = useState(false)
  const [hasBeenUploaded, setHasBeenUploaded] = useState(false)

  useEffect(() => {
    if (files.length === 0) {
      setHasBeenUploaded(false)
    }
  }, [files])

  const inputRef = useRef()
  const onError = (message) => {
    setErrorMessage(message)
    setSuccess(false)
  }

  const deleteFile = (fileToDelete) => {
    inputRef.current.value = '' // Remove the current file that is in the input
    // This is implemented like this if we need to handle multiple files in a single upload in the future
    setFiles([...files.filter(file => file.name !== fileToDelete.name)])
    setSuccess(false)
  }

  const camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    }).replace(/\s+/g, '')
  }

  const trimJSON = (dataToTrim) => {
    dataToTrim.map(dataObject => {
      const keys = Object.keys(dataObject)
      keys.forEach(key => {
        const trimmedKeyName = camelize(key).replaceAll('(', '').replaceAll(')', '')
        dataObject[trimmedKeyName] = dataObject[key]
        delete dataObject[key]
      })
    })
    return dataToTrim
  }

  const checkFormat = (data) => {
    const requiredColumns = ['name', 'campus', 'internationInstitution',
      'academicPeriodName', 'code', 'occurenceName', 'period',
      'creditsDecimal', 'creditsECTSDecimal', 'description'
    ]
    for (const [row, dataPoint] of data.entries()) {
      const columns = Object.keys(dataPoint)
      for (const column of requiredColumns) {
        const columnIncluded = columns.includes(column)
        const missingValue = dataPoint[column] === ''
        if (!columnIncluded) {
          return [column, row, 'columnMissing', false]
        }
        if (missingValue) {
          // TODO: should we handle this?
          // return [column, row, 'valueMissing', false]
        }
      }
    }
    return [null, null, null, true]
  }

  const handleFormatErrors = (column, row, errorType) => {
    if (errorType === 'columnMissing') {
      console.log(`Error: Missing column "${column}"`)
      setErrorMessage(`Error: Missing column "${column}"`)
      setSuccess(false)
    }
    if (errorType === 'valueMissing') {
      console.log(`Error: Missing value for column "${column}" at row ${row + 2}`)
      // setErrorMessage(`Error: Missing value for column "${column}" at row ${row + 2}`)
      // setSuccess(false)
    }
  }

  const commitFile = () => {
    const file = files[0]
    const reader = new FileReader()

    reader.readAsText(file)

    reader.onload = async () => {
      const untrimmedJSON = csv2json(reader.result)
      const trimmedJSON = trimJSON(untrimmedJSON)
      const [column, row, errorType, successful] = checkFormat(trimmedJSON)
      if (!successful) {
        handleFormatErrors(column, row, errorType)
        return
      }
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ trimmedJSON, semester }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (data.error) {
        setErrorMessage(data.error)
        setSuccess(false)
      } else {
        setSuccess(true)
        setHasBeenUploaded(true)
      }
    }
  }

  const restoreBackup = async () => {
    const response = await fetch('/api/upload', {
      method: 'DELETE'
    })
    const data = await response.json()
    if (data.error) {
      setErrorMessage(data.error)
    } else {
      setHasBeenUploaded(false)
    }
  }

  const semesters = ['Autumn', 'Spring']

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.uploadPage}>
        <UploadNavbar setOpenHelper={setOpenHelper} />
        <Grid container sx={{ mt: '10vh', width: '90vw', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }} gap={10}>
          <Grid item xs={4}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography sx={{ fontSize: 16, zIndex: 10 }}>
                Start by picking the semester that you wish to update the course data for by selecting it from the semester drop down. <br /><br />
                After the semester has been picked
                choose the corresponding course data file by browsing your computer files or drag and drop the file into
                the dashed box, the file has to be in .csv format. <br /><br />
                Make sure that the file provided adheres to the format required by specifying the correct names for each column.
                <HelpIcon sx={{ cursor: 'pointer', fontSize: 20, ml: 2 }} onClick={() => setOpenHelper(true)} />
              </Typography>
            </div>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={2}>
              <UploadOptionSelect
                name='Choose semester'
                values={semesters}
                state={semester}
                setState={setSemester}
              />
              <UploadForm
                setSuccess={setSuccess}
                onError={onError}
                success={success}
                setFiles={setFiles}
                files={files}
                inputRef={inputRef}
              />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            {files?.length ? <UploadedFilesList files={files} deleteFile={deleteFile} /> : null}
            <MainButton
              disabled={!success || hasBeenUploaded}
              onClick={commitFile}
              variant='contained'
              color='accent'
              sx={{ color: theme.palette.third.main }}
            >
              upload courses
              <FileUploadIcon sx={{ fontSize: 'medium', ml: 1 }} />
            </MainButton>
            <MainButton
              disabled={!hasBeenUploaded}
              onClick={() => restoreBackup()}
              variant='contained'
              color='accent'
              sx={{ color: theme.palette.third.main, mt: 1 }}
            >
              undo
              <RestoreIcon sx={{ fontSize: 'medium', ml: 1 }} />
            </MainButton>
          </Grid>
        </Grid>
        <div className={styles.sigill}>
          <img src='/images/sigill.png' />
        </div>
        <UploadHelper openHelper={openHelper} setOpenHelper={setOpenHelper} />
      </div>
    </ThemeProvider>
  )
}
