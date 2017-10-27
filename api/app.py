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
  base = Response(json.dumps(info, indent=4), mimetype='application/json')
  base.headers['Access-Control-Allow-Origin'] = 'http://localhost:9000'
  return base

def fail(info):
  base = Response(json.dumps(info, indent=4), mimetype='application/json', status=400)
  base.headers['Access-Control-Allow-Origin'] = 'http://localhost:9000'
  return base

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

@app.route('/tweets', methods = ['GET', 'POST'])
def tweet():
  if request.method == 'GET':
    cursor = request.args.get('cursor') or 0
    limit = request.args.get('limit') or 10
    return wrap(get_tweets(cursor, limit))
  if request.method == 'POST':
    data = request.form
    return post_tweet(data)

tweet_key = 'tweets'

def get_tweets(cursor, limit):
  items = redis.lrange(tweet_key, cursor, cursor + limit - 1)
  ids = range(cursor, cursor + limit - 1)
  likes = [get_tweet_likes(i) for i in ids]
  results = [{'text': text, 'id': idd, 'likes': likes} for (text, idd, likes) in zip(items, ids, likes)]
  return {
    'items': results
  }

def get_tweet_likes(tweet_id):
  return int(redis.get(tweet_likes_key(str(tweet_id))) or 0)

def post_tweet(data):
  text = data['text']
  if text and len(text.strip()):
    res = redis.lpush(tweet_key, text)
    return wrap({
      'id': (res - 1),
      'text': text,
      'likes': 0
    })
  else:
    return fail({
      'success': False
    })

def tweet_likes_key(tweet_id):
  return 'likes_' + tweet_id

@app.route('/tweets/<tweet_id>/like', methods = ['POST'])
def like_tweet(tweet_id):
  count = redis.incr(tweet_likes_key(tweet_id))
  return wrap({
    'count': count,
    'success': True
  })

