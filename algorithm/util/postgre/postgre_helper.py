# POSTGRESQL helper for TA
import psycopg2


class PostgreSQLHelper(object):
  # Minimum Content of credentials
  def __init__(self, credentials):
    self.conn = psycopg2.connect(
      database=credentials["DB_NAME"],
      user=credentials["USERNAME"],
      password=credentials["PASSWORD"],
      host=credentials['HOST'],
      port=credentials['PORT']
    )

    self.cur = self.conn.cursor()

  def db_select_query(self, query):
    self.cur.execute(query)
    return self.cur.fetchall()

  def db_edit_query(self, query):
    self.cur.execute(query)
    self.conn.commit()

  def db_close(self):
    self.cur.close()
    self.conn.close()
