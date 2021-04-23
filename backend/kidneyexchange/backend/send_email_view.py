from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status

import ast
import json
import ssl
import smtplib # Simple Mail Transfer Protocol
from email.mime.multipart import MIMEMultipart # compose message
from email.mime.text import MIMEText # compose message body

# constants
from .exchange_src.algorithm.util.constants import template_email, template_link, from_email, from_email_password
from .exchange_src.algorithm.util.read_pairs_data import get_emails

@api_view(['POST'])
def send_email(request):
  data = json.loads(json.dumps(request.data))
  flatten = lambda t: [item for sublist in t for item in sublist]
  data_date = data['dataDate']
  pairs = flatten(ast.literal_eval(data['cycles']))
  receivers = get_emails(data_date, pairs)
  email_body = template_email

  #server
  smtp_server = "smtp.gmail.com" #smtp buat gmail
  port_ssl = 465
  ctx = ssl.create_default_context()
  server = smtplib.SMTP_SSL(smtp_server, port_ssl, context=ctx)

  server.login(from_email, from_email_password)

  # send messages
  for pair_num, receiver_email in receivers:
    # build message for each receivers
    message = MIMEMultipart()
    message['From'] = from_email
    message['To'] = receiver_email
    message['Subject'] = pair_num + " Match Mapping Result"

    # compose body
    this_body = email_body.replace("__pair_num__", pair_num)
    this_link = "<a href=\"" + template_link + pair_num + "\"> link </a>"
    this_body = this_body.replace("__link__", this_link)
    # because the link is not a link but a html part, set the link below
    this_body += "<br><br><br>" + template_link + pair_num
    body = MIMEText(this_body, 'html')
    message.attach(body)

    # send message to each receiver
    server.sendmail(from_email, receiver_email, message.as_string())

  # return template response
  return JsonResponse({
    "status": status.HTTP_200_OK,
    "numberOfSentEmail": len(receivers),
  })
