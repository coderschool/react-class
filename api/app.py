from flask import Flask, Response, render_template, request

import json
from datetime import date, datetime, timedelta, time
import sys

import redis

app = Flask(__name__)

redis = redis.StrictRedis(
    host='redis',
    port=6379
)

# Halpers
def wrap(info):
  return Response(json.dumps(info, indent=4), mimetype='application/json')

def fail(info):
  return Response(json.dumps(info, indent=4), mimetype='application/json', status=400)

@app.route('/easter')
def index():
  info = {
    'info': 'Congrats you found an easter egg, you easter egg finding motherfucker.'
  }
  return wrap(info)


@app.route('/clear-all')
def clear_all():
  redis.flushall()
  info = {
    'success': True
  }
  return wrap(info)

@app.route('/users/<user_id>/items', methods = ['GET', 'POST'])
def user_items(user_id):
  if request.method == 'GET':
    cursor = request.args.get('cursor') or 0
    limit = request.args.get('limit') or 10
    return wrap(get_user_items(user_id, cursor, limit))
  if request.method == 'POST':
    data = request.get_json()
    return post_user_items(user_id, data)

def get_user_items(user_id, cursor, limit):
  items = redis.lrange(user_id, cursor, cursor + limit - 1)
  return {
    'items': items
  }

def post_user_items(user_id, data):
  text = data.get('text')
  if text:
    res = redis.lpush(user_id, text)
    print >> sys.stderr, res
    return wrap({
      'success': True
    })
  else:
    return fail({
      'success': False
    })

  # insert data into redis

