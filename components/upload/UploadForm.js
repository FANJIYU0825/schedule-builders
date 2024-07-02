import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone'
import styles from '../../styles/UploadForm.module.css'
import { useTheme } from '@mui/material'

function UploadForm ({ setSuccess, onError, success, setFiles, files, inputRef }) {
  const theme = useTheme()

  const Icon = success && files?.length
    ? FileDownloadDoneIcon
    : CloudUploadIcon

  const handleFileUpload = async (e) => {
    try {
      const file = e.target.files[0]
      if (file) {
        if (file.type !== 'text/csv') {
          onError('File provided is not in .csv format, please upload a .csv file')
          return
        }
        setFiles(prevState => [...prevState, file])
        setSuccess(true)
      }
    } catch (error) {
      if (onError) {
        onError(error.message)
      } else {
        console.error(error)
      }
    }
  }

  // Conditional styles for the upload box (shows when input is disabled)
  const uploadStyle = {
    cursor: files.length ? 'not-allowed' : 'pointer'
  }

  return (
    <div className={styles.fileUploadContainer}>
      <div className={styles.fileUpload} style={uploadStyle}>
        <input
          ref={inputRef}
          className={styles.fileUploadInput}
          type='file'
          accept='.csv'
          onChange={handleFileUpload}
          style={{ color: 'transparent', cursor: files.length ? 'not-allowed' : 'pointer' }}
          title=''
          disabled={files.length}
        />
        <div className={styles.fileUploadContent}>
          <Icon sx={{ width: '40%', height: '40%', color: files.length ? '#4caf50' : theme.palette.primary.main }} />
          {files.length ? <p>{files[0].name}</p> : <p>DRAG AND DROP HERE <br /> OR <br /> CLICK TO BROWSE</p>}
        </div>
      </div>
    </div>
  )
}

export default UploadForm
