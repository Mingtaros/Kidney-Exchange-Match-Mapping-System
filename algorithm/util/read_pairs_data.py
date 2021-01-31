import numpy as np
import pandas as pd
from .postgre.postgre_helper import PostgreSQLHelper
from .postgre.postgre_env_reader import POSTGRE_ENV, DONOR_RECIPIENT_TABLE_NAME

def read_pairs_data(pairs_filename):
  # Read pairs data from local file
  with open(pairs_filename, 'r') as f:
    pairs_data = f.read()

  pairs_data = pairs_data.split("\n")
  pairs_data = [np.array(data.split("\t")) for data in pairs_data][1:-1]
  
  data = pd.DataFrame(pairs_data, columns=['pair_num', 'donor_bloodtype', 'recipient_bloodtype', 'pra'])
  data['pra'] = pd.to_numeric(data['pra'].replace({'-': '-1'}))
  
  return data

def read_pairs_db(pair_num_start, pair_num_end):
  # Read paris data from PostgreSQL
  if (pair_num_start > pair_num_end):
    raise ValueError("pair_num_end must be >= than pair_num_start")

  # query the data to take
  psql = PostgreSQLHelper(POSTGRE_ENV)
  
  query =  "SELECT *"
  query += " FROM " + DONOR_RECIPIENT_TABLE_NAME
  query += " WHERE CAST(SUBSTRING(pair_num FROM '\d+') AS int) BETWEEN "
  query += str(pair_num_start) + " AND " + str(pair_num_end)

  rows = psql.db_select_query(query)

  psql.db_close()
  
  # convert data to dataframe before returning
  data_columns = ['pair_num', 'donor_bloodtype', 'recipient_bloodtype', 'pra']
  return pd.DataFrame(rows, columns=data_columns)
