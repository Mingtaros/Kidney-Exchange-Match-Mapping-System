from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

import json
import ast

from .exchange_src.algorithm.util.crud_best_result import insert_or_update_best_result, select_best_result_pairs
from .exchange_src.algorithm.util.flatten import flatten


@api_view(["POST"])
def save_best_result(request):
  data = request.data
  message = insert_or_update_best_result(data["dataDate"], data["matchedPairs"])

  return JsonResponse({
    "status": status.HTTP_200_OK,
    "message": message,
  })


@api_view(["GET"])
def get_matched_pairs(request):
  data = json.loads(json.dumps(request.query_params))

  if ("dataDate" not in data):
    return Response(status=status.HTTP_400_BAD_REQUEST)

  best_result_pairs = select_best_result_pairs(data["dataDate"])

  if len(best_result_pairs) == 0: # data date not found in db
    return Response(status=status.HTTP_404_NOT_FOUND)
  else:
    matched_pairs = ast.literal_eval(best_result_pairs[0][1])
    return JsonResponse({
      "status": status.HTTP_200_OK,
      "matchedPairs": matched_pairs,
      "numOfMatchedPairs": len(flatten(matched_pairs))
    })
