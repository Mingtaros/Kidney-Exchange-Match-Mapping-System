from django.http import JsonResponse
from pandas.core.indexing import maybe_convert_ix
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

import numpy
import pandas
import json
import time
import ast

# Exchange Algorithms
from .exchange_src.algorithm.edmonds import EdmondsAlgorithm
from .exchange_src.algorithm.first_accept_n_way import FirstAcceptNWay
from .exchange_src.algorithm.priority_based_n_way import PriorityBasedNWay

# Utilities
from .exchange_src.algorithm.util.directed_graph import DirectedGraph
from .exchange_src.algorithm.util.read_pairs_data import read_data_db, show_data_db, show_data_db_specific_pairs, get_all_dates


@api_view(["GET"])
def get_all_date(request):
  all_date = get_all_dates() # postgres query to get all dates

  return JsonResponse({
    "status": status.HTTP_200_OK,
    "data": all_date
  })


@api_view(["GET"])
def get_data(request):
  # get data from database by date
  data = json.loads(json.dumps(request.query_params))

  if ('dataDate' not in data):
    return Response(status=status.HTTP_400_BAD_REQUEST)

  db_data = show_data_db(data['dataDate'])
  # data format: list of pairs
  #     (pair_num, donor_name, donor_bloodtype, recipient_name, recipient_bloodtype, pra, email)

  return JsonResponse({
    "status": status.HTTP_200_OK,
    "data": db_data
  })


@api_view(["GET"])
def get_data_on_pair_numbers(request):
  # get data from database by date and pair number
  data = json.loads(json.dumps(request.query_params))

  if ('dataDate' not in data) or ('pairNumbers' not in data):
    return Response(status=status.HTTP_400_BAD_REQUEST)
  
  db_data = show_data_db_specific_pairs(data['dataDate'], ast.literal_eval(data['pairNumbers']))
  # data format: list of pairs
  #     (pair_num, donor_name, donor_bloodtype, recipient_name, recipient_bloodtype, pra, email)

  return JsonResponse({
    "status": status.HTTP_200_OK,
    "data": db_data
  })


@api_view(["GET"])
def get_finalized_exchange(request):
  data = json.loads(json.dumps(request.query_params))
  
  if (('dataDate' not in data) or
      ('exchangeMethod' not in data)):
    return Response(status=status.HTTP_400_BAD_REQUEST)
  
  # create graph from data
  pairs = read_data_db(data['dataDate'])
  grph = DirectedGraph(pairs)

  start_time = time.time()
  # Finalize exchange
  if (data['exchangeMethod'] == 'edmond'):
    if ('priorityThreshold' not in data):
      return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
      exchanger = EdmondsAlgorithm(priority_threshold=int(data['priorityThreshold']))
  
  elif (data['exchangeMethod'] == 'firstaccept'):
    if (('n' not in data) or
        ('nMethod' not in data)):
      return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
      exchanger = FirstAcceptNWay(n=int(data['n']), method=data['nMethod'])
  
  elif (data['exchangeMethod'] == 'priority'):
    if (('n' not in data) or
        ('nMethod' not in data) or
        ('priority' not in data)):
      return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
      exchanger = PriorityBasedNWay(n=int(data['n']), method=data['nMethod'], priority=data['priority'])
  
  else: # Exchange Method not found
    return Response(status=status.HTTP_400_BAD_REQUEST)

  exchanger.finalize_exchange(grph)

  end_time = time.time()
  time_elapsed = (end_time - start_time) * 1000

  return JsonResponse({
    "status": status.HTTP_200_OK,
    "exchanges": exchanger.cycles,
    "numOfMatchedPairs": exchanger.get_num_of_matched_pairs(),
    "timeElapsed": time_elapsed # in millisecond
  })
