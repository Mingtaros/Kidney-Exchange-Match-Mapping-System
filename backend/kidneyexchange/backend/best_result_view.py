from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status

import ast
import json

from .exchange_src.algorithm.util.crud_best_result import insert_or_update_best_result


@api_view(["POST"])
def save_best_result(request):
  data = request.data
  message = insert_or_update_best_result(data["dataDate"], data["matchedPairs"])

  return JsonResponse({
    "status": status.HTTP_200_OK,
    "message": message,
  })
