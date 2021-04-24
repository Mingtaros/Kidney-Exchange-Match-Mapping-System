from .postgre.postgre_helper import PostgreSQLHelper
from .postgre.postgre_env_reader import POSTGRE_ENV


def create_dr_table(table_name):
  # create donor recipient table with table_name
  # same attribute as other donor recipient tables
  psql = PostgreSQLHelper(POSTGRE_ENV)

  create_query = "CREATE TABLE " + table_name + " ("
  create_query += " pair_num VARCHAR(50) PRIMARY KEY,"
  create_query += " donor_name VARCHAR(100) NOT NULL,"
  create_query += " donor_bloodtype VARCHAR(10) NOT NULL,"
  create_query += " recipient_name VARCHAR(100) NOT NULL,"
  create_query += " recipient_bloodtype VARCHAR(10) NOT NULL,"
  create_query += " pra INT NOT NULL,"
  create_query += " email VARCHAR(50) NOT NULL)"

  psql.db_edit_query(create_query)
  psql.db_close()


def insert_new_pair(table_name, donor_name, donor_bloodtype, recipient_name, recipient_bloodtype, pra, email):
  # check last pair
  psql = PostgreSQLHelper(POSTGRE_ENV)

  select_query = "SELECT * FROM " + table_name
  rows = psql.db_select_query(select_query)
  
  if (len(rows) == 0):
    # if empty table, use Pair Number 0
    pair_num = "P0"
  else:
    # if not empty table, use last Pair Number + 1
    pair_num = int(rows[-1][0][1:]) + 1
    pair_num = "P" + str(pair_num)

  insert_query = "INSERT INTO " + table_name + " (pair_num, donor_name, donor_bloodtype, recipient_name, recipient_bloodtype, pra, email)"
  insert_query += " VALUES ('" + pair_num + "', '" + donor_name + "', '" + donor_bloodtype
  insert_query += "', '" + recipient_name + "', '" + recipient_bloodtype + "', " + pra
  insert_query += ", '" + email + "')"

  psql.db_edit_query(insert_query)
  psql.db_close()

  return pair_num
