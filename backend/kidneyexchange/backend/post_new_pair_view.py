from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status

from datetime import datetime

from .exchange_src.algorithm.util.read_pairs_data import get_all_dates
from .exchange_src.algorithm.util.add_new_pair import create_dr_table, insert_new_pair


@api_view(["POST"])
def post_new_pair(request):
  # post new pair to date db
  data = request.data
  current_date = datetime.now()
  is_available_date = current_date.strftime("%Y/%m/%d")
  table_name = current_date.strftime("dr%Y_%m_%d")
  # check if table already exist
  if (is_available_date not in get_all_dates()):
    # create table if it doesn't exist
    create_dr_table(table_name)

  resulted_pair_num = insert_new_pair(
    table_name,
    data["donorName"],
    data["donorBloodtype"],
    data["recipientName"],
    data["recipientBloodtype"],
    data["pra"],
    data["email"]
  )

  return JsonResponse({
    "status": status.HTTP_200_OK,
    "pairNum": resulted_pair_num,
  })
