from environs import Env

env = Env()
env.read_env()

# BIOLOGICAL CONSTANTS
blood_type_match = {
  # row: donor blood type
  # column: recipient blood type
  "O" : {"O": 1, "A": 1, "B": 1, "AB": 1},
  "A" : {"O": 0, "A": 1, "B": 0, "AB": 1},
  "B" : {"O": 0, "A": 0, "B": 1, "AB": 1},
  "AB": {"O": 0, "A": 0, "B": 0, "AB": 1}
}

NO_TYPE = "-"


# SENDING EMAIL CONSTANTS
from_email = env("FROM_EMAIL")
from_email_password = env("FROM_EMAIL_PASSWORD")
template_email = """
<html><body>
Dear __pair_num__,
<br><br>
Thanks for your patience. The link to see your match mapping result are attached below. Thank you.
<br><br>
Please click this link to see your match mapping result: __link__
<br><br>
System
</body></html>"""
template_link = env("TEMPLATE_LINK")
