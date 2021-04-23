# script to insert data from data directory to db
import string
import random
from datetime import datetime
from postgre.postgre_helper import PostgreSQLHelper
from postgre.postgre_env_reader import POSTGRE_ENV


base_path = "../../data/100/"
psql = PostgreSQLHelper(POSTGRE_ENV)

for i in range(30):
  # read data file
  f_name = "100_" + str(i) + "_pairs.txt"
  with open(base_path + f_name) as f:
    content = f.read()

  # create table query construction
  table_name = "dr" + datetime(2021, 1, (i+1)).strftime("%Y_%m_%d")
  query = "CREATE TABLE IF NOT EXISTS " + table_name + " ("
  query += " pair_num VARCHAR(50) PRIMARY KEY,"
  query += " donor_name VARCHAR(100) NOT NULL,"
  query += " donor_bloodtype VARCHAR(10) NOT NULL,"
  query += " recipient_name VARCHAR(100) NOT NULL,"
  query += " recipient_bloodtype VARCHAR(10) NOT NULL,"
  query += " pra INT NOT NULL,"
  query += " email VARCHAR(50) NOT NULL)"

  psql.db_edit_query(query)
  data = content.split("\n")[1:]
  for datum in data:
    pair_num, donor_bloodtype, recipient_bloodtype, pra = datum.split("\t")

    # generate random name for donor and recipient
    letters = string.ascii_lowercase
    donor_name = ''.join(random.choice(letters) for _ in range(random.randint(3, 10)))
    recipient_name = ''.join(random.choice(letters) for _ in range(random.randint(3, 10)))

    email = "leonardow41@gmail.com"

    # insert to table query construction
    insert_query = "INSERT INTO " + table_name + "(pair_num, donor_name, donor_bloodtype, recipient_name, recipient_bloodtype, pra, email)"
    insert_query += " VALUES ('" + pair_num + "', '" + donor_name + "', '" + donor_bloodtype
    insert_query += "', '" + recipient_name + "', '" + recipient_bloodtype + "', " + pra
    insert_query += ", '" + email + "')"

    psql.db_edit_query(insert_query)
    print(datum, "inserted to", table_name)
