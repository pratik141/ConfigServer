#!/usr/bin/env python
# -*- coding: utf-8 -*-

__author__ = "Pratik Anand"
__credits__ = [ "Pratik Anand" ]
__version__ = "0.0.1"
__maintainer__ = "Pratik Anand"
__email__ = "anandpratik141@gmail.com"


from flask import Flask, redirect, url_for, request, render_template, session, escape
from controllers import fileSystem, userLogin
import os

app = Flask(__name__)
# toolbar = DebugToolbarExtension(app)

@app.route('/login/', methods=['GET', 'POST'])
def login():
	# print(request.query_string.replace('redirect=',''))
	try:
		redir = request.query_string.replace('redirect=','')
	except:
		redir = request.query_string.split('=')[1]
	return userLogin.Login(redir)


@app.route('/logout')
def logout():
    session.pop('username', None)
    try:
      session.pop('is_admin')
    except:
      pass
    return redirect(url_for('index'))

@app.route('/')
def index():
  
  if not 'username' in session:
    path = request.path
    Qstr = request.query_string  
    return redirect(url_for('login')+'?redirect='+path+Qstr)
  
  if not 'is_admin' in session:
    return "You are not authorized to see this page <a style='float: right;' href='/logout'> <b> Logout </b> </a>"
  
  username_session = escape(session['username'])
  return render_template('index.html',  session_user_name=username_session)


@app.route('/deploy',methods = ['POST'])
def buildlogpost():
	if not 'is_admin' in session:
		return "You are not authorized to perform this action <a style='float: right;' href='/logout'> <b> Logout </b> </a>"

	return fileSystem.deployProp()
  

@app.route('/frm/',methods = ['GET'])
def submit():
  all_args = request.args.to_dict()
  return fileSystem.getFile(all_args)


@app.route('/getfile/',methods = ['GET','POST'])
def getfile():
  if not 'username' in session:
    path = request.path
    Qstr = request.query_string  
    return redirect(url_for('login')+'?redirect='+path+Qstr)

  if request.method == 'GET':
  	return render_template('getfile.html',
  		session_user_name = escape(session['username']),
  		filelist = os.listdir(os.getcwd()+'/data'))

  all_args = request.args.to_dict()
  return fileSystem.getFile(all_args)


@app.route('/filelist/')
def VersionList():
  if not 'username' in session:
    path = request.path
    Qstr = request.query_string  
    return redirect(url_for('login')+'?redirect='+path+Qstr)

  if not 'is_admin' in session:
    return "You are not authorized to see this page <a style='float: right;' href='/logout'> <b> Logout </b> </a>"
  
  username_session = escape(session['username'])
  return fileSystem.getFileList(username_session)



app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0',port=8080,threaded=True)


# http://localhost:8070/build/?startdate=12-09-2017&enddate=12-09-2017&mailto=True&mailid=&showoption=html