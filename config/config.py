#!/usr/bin/env python

login_url= "https://localhost/api/user/v1/login"

### Other details ###

log_file_name="flaskapp.log"
generated_dir_location  = 'generated/'
template_dir_location = 'data/' 

#  "INFO" "DEBUG" "ERROR"
log_level="WARN"

UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'sh', 'jpg', 'jpeg', 'gif'])