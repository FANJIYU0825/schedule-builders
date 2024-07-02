# Data preprocessing

The preprocessing.js Node module provides functionality for the server side to process and format a user-inputted csv file. This module is called from the api/upload endpoint.

If one wishes to do the preprocessing manually, the Python scripts in this directory can be used to preprocess the data so it fits the format used in the code.

When you have a JSON file with the course data, you can run the script 'main_proc.py' to run all preprocessing scripts.

```
$ python main_proc.py <input json file> <output json file>
```