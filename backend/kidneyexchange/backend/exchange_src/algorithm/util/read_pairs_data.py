import numpy as np
import pandas as pd

from .postgre.postgre_helper import PostgreSQLHelper
from .postgre.postgre_env_reader import POSTGRE_ENV, DONOR_RECIPIENT_TABLE_NAME


def read_pairs_file(filename):
  # Read pairs data from a local file
  with open(filename, 'r') as f:
    pairs_data = f.read()

  pairs_data = pairs_data.split("\n")
  pairs_data = [np.array(data.split("\t")) for data in pairs_data][1:-1]
  
  data = pd.DataFrame(pairs_data, columns=['pair_num', 'donor_bloodtype', 'recipient_bloodtype', 'pra'])
  data['pra'] = pd.to_numeric(data['pra'])
  
  return data


def read_data_db(data_date):
  # DATE FORMAT: %Y/%m/%d --> converted to %Y_%m_%d
  psql = PostgreSQLHelper(POSTGRE_ENV)
  data_date = data_date.replace("/", "_")
  table_name = "dr" + data_date

  # ditch donor name, recipient name, email
  query = "SELECT pair_num, donor_bloodtype, recipient_bloodtype, pra"
  query += " FROM " + table_name

  rows = psql.db_select_query(query)
  
  psql.db_close()

  # convert data to dataframe before returning
  data_columns = ['pair_num', 'donor_bloodtype', 'recipient_bloodtype', 'pra']
  return pd.DataFrame(rows, columns=data_columns)


def show_data_db(data_date):
  # DATE FORMAT: %Y/%m/%d --> converted to %Y_%m_%d
  psql = PostgreSQLHelper(POSTGRE_ENV)
  data_date = data_date.replace("/", "_")
  table_name = "dr" + data_date

  query = "SELECT * FROM " + table_name
  rows = psql.db_select_query(query)
  
  psql.db_close()

  # return data in list of pair format
  return rows
