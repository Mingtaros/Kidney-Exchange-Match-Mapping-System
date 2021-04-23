import psycopg2

from .postgre.postgre_helper import PostgreSQLHelper
from .postgre.postgre_env_reader import POSTGRE_ENV


def insert_or_update_best_result(data_date, matched_pairs):
  psql = PostgreSQLHelper(POSTGRE_ENV)
  matched_pairs = matched_pairs.replace("\'", "\"")

  try:
    query = "INSERT INTO best_result (date, matched_pairs)"
    query += " VALUES ('" + data_date + "', '" + matched_pairs + "')"

    psql.db_edit_query(query)
  except psycopg2.errors.UniqueViolation: # cannot insert because it already exists
    query = "UPDATE best_result"
    query += " SET matched_pairs = '" + matched_pairs
    query += "' WHERE date = " + data_date + "'"

    psql.db_edit_query(query)
