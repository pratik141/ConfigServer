#!/usr/bin/python

log_file_name="/opt/logs/git.log"
log_level="INFO"

import sys
import logging

logging.basicConfig(filename=log_file_name,level=log_level,format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p')
#logging.basicConfig(stream=sys.stdout)
sys.path.insert(0,"/var/www/Portal")

from WebService import app as application
application.secret_key = 'Addsecret'
