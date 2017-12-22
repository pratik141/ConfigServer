from jinja2 import Environment, FileSystemLoader
from config import config as cnf
import os
import json 

env = Environment(loader=FileSystemLoader('data'))

def createFile(_file_,config_data,splitter,separator=';'):

  templates_file = _file_.split('.')[0]+'.jinja'
  temp_vars      = config_data.split(separator)
  write_location = cnf.generated_dir_location + _file_.split('.')[0]
  template_vars  = {}

  for i in temp_vars:
    #Get Key Value pairs separately to store in dictionary
    keyvalue = i.split(splitter)

    #Replacing the single quotes in the leading.
    m= keyvalue[0].strip('\'')
    m = m.replace("\"", "")
    template_vars[m] = keyvalue[1].strip('"\'')

  # if json in v2
  # with open(json_data_file) as json_data:
  #     template_vars = json.load(json_data)
  html_data = env.get_template(templates_file).render(user_data=template_vars )

  f = open(write_location, "w")
  f.write(html_data)
  f.close()

  return write_location


# spliter = ":"
# templates_html_file = "dockerfile.jinja"
# config_data = "img:pratik;port:8081;art:22763.jar"

# createFile(templates_html_file,config_data,spliter)
