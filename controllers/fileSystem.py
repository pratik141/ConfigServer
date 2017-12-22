
from flask import request, render_template ,redirect, flash, url_for,send_file
from config import config as cnf
from controllers import converter as cnv
import logging
import os

logging.basicConfig(filename=cnf.log_file_name,
                    level=cnf.log_level,
                    format='%(asctime)s %(message)s', 
                    datefmt='%m/%d/%Y %I:%M:%S %p')

def allowed_file(filename):
  return '.' in filename and filename.rsplit('.', 1)[1].lower() in cnf.ALLOWED_EXTENSIONS

def deployProp():
  try:
    file = request.files['file']
    fileoption     = request.form['fileoption']
    filename       = request.form['filename']
    databox        = request.form.getlist('datacheckboxname')
    overwritefile  = request.form.getlist('overwritecheckboxname')

  except Exception as e:
    print(e)
    
  if 'file' not in request.files:
    flash('No file part')
    return redirect(request.url)

  ## verifying 
  
  if not overwritefile and os.path.exists(os.getcwd()+'/data/'+filename) :
    flash('{} already exist'.format(filename))
    return redirect(url_for('index'))

  if not file and not databox:
    flash('No file selected or data not found')
    return redirect(url_for('index'))

#  Deploying data / file 
  if file and allowed_file(filename):
    file.save(os.path.join(os.getcwd()+'/data', filename))
    
  if databox:
    fileData = request.form['filedata']
    f = open(os.path.join(os.getcwd()+'/data', filename), "w")
    f.write(str(fileData))      # str() converts to string
    f.close()
  
  return "{} added to server ".format(filename)+ render_template('footer.html')


def getFile(all_arg):
  """
  This  function will download file from server and parse all_arg.
  Containing :-

  {
    "filename" : "str", 
    "filedata" : "str",
    "splitter" : "str"
    "separator": "str"
  }

  # http://0.0.0.0:8070/getfile/?filename=str&filedata=str
    
  """
  try:
    filename  = all_arg.get('filename') 
    filedata  = all_arg.get('filedata')
    splitter  = all_arg.get('splitter')
    separator = all_arg.get('separator')
  except Exception as e:
    logging.error(e)
    return e

  if splitter == 'null':
    return send_file(cnf.template_dir_location +'/'+filename,
                      as_attachment=True, attachment_filename=filename)
  else:
    downloadFile = cnv.createFile(filename,filedata,splitter,separator)
    return send_file(downloadFile, as_attachment=True, attachment_filename=filename.split('.')[0])
  


def getFileList(username_session):
  filelist = os.listdir(os.getcwd()+'/data')
  return render_template('list.html',  session_user_name=username_session,filelist=filelist)
  