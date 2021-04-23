import psycopg2

from .postgre.postgre_helper import PostgreSQLHelper
from .postgre.postgre_env_reader import POSTGRE_ENV


def insert_or_update_best_result(data_date, matched_pairs):
  # returning post return message
  psql = PostgreSQLHelper(POSTGRE_ENV)
  matched_pairs = matched_pairs.replace("\'", "\"")

  return_message = ""
  # check if exist
  select_query = "SELECT * FROM best_result WHERE date = '" + data_date + "'"
  rows = psql.db_select_query(select_query)
  if len(rows) == 0:
    query = "INSERT INTO best_result (date, matched_pairs)"
    query += " VALUES ('" + data_date + "', '" + matched_pairs + "')"

    psql.db_edit_query(query)
    return_message += "Succesfully Inserted with date = " + data_date 
  else: # cannot insert because the date already exists
    flatten = lambda t: [item for sublist in t for item in sublist]
    matched_pairs_len = len(matched_pairs.split(","))
    original_pairs_len = len(rows[0][1].split(","))
    # not updating if the existing matched_pairs is better
    if matched_pairs_len > original_pairs_len:
      query = "UPDATE best_result"
      query += " SET matched_pairs = '" + matched_pairs
      query += "' WHERE date = '" + data_date + "'"

      psql.db_edit_query(query)
      return_message += "Succesfully Updated with date = " + data_date
    else:
      return_message += "Not updating date = " + data_date
      return_message += " previous = " + str(original_pairs_len) + " pairs"
      return_message += " after = " + str(matched_pairs_len) + " pairs."

  psql.db_close()
  return return_message
