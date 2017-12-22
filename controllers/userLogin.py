#!/usr/bin/env python

from flask import  redirect, url_for, request, render_template, request ,session
from config import config 
import yaml as yml
import requests
import json
import os

def Login(callee=None):
  error = None
  if 'username' in session:
      return redirect(url_for('index'))
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']

    # payload="""
    # {
    #   "data": {
    #     "userName": "%s",
    #     "password": "%s"
    #   }
    # }"""%(username,password)

    try:
      headers = {'content-type': 'application/json'}

      ## Validation
      # print yml.load('usr.yml','r')
      db_password = 'admin' # data.get(username)
      _is_admin_  = 'true'

      # req = requests.post(config.login_url, payload, headers=headers)
      # req_json    = json.loads(req.text)
      # data        = req_json.get("data")
      # status_code = req_json.get("httpStatusCode")
      # displayName = data.get('displayName')
      # _is_admin_  = data.get('isAdmin')


      if password == db_password:
        session['username'] = username
        if _is_admin_ == 'true':
          session['is_admin'] = 1
        
        if callee == None:
          return redirect(url_for('index'))
        else:
          return redirect(callee)
          
      else:
        error = "Invalid Credentials"
    except Exception as e:
      try:
        session.pop('username', None)
        session.pop('is_admin')
      except:
        pass
    
      error = "Invalid Credential"      
  return render_template('login.html', error=error)