# Final Project Backend
Backend Endpoints for web app in order to access database and match-searching algorithms. Created with Django.

## Get All Date
Get Request to get all dates from data that has at least one registrant pair (which are the table names).
```
GET /getAllDate
```
Query Parameters:
```
{}
```
Returns:
```
{
  status: INT (status of the request),
  data: LIST of STRING (date in String format)
}
```
## Get Data
Get Request to return all data from that database given the date.
```
GET /getData
```
Query Parameters:
```
{
  dataDate: Data date in %Y/%m/%d format
}
```
Returns:
```
{
  status: INT (status of the request),
  data: LIST of LIST (in (pair_num, donor_name, donor_bloodtype, recipient_name, recipient_bloodtype, pra, email) format)
}
```
## Get Finalized Exchange
Get Request to get list of cycles given data from a specific date and also the algorithms
```
GET /getFinalizedExchange
```
Query Parameters: 
```
{
  dataDate: Data date in %Y/%m/%d format,
  exchangeMethod: Match-Searching algorithm to use,
  n: IF exchangeMethod is one of the N-Way methods; input number of n,
  nMethod: IF exchangeMethod is one of the N-Way methods; input n method to use,
  priorityThreshold: IF exchangeMethod is Edmond's; input priority threshold,
  priority: IF exchangeMethod is Priority Based; input priority type,
}
```
Returns:
```
{
  status: INT (status of the request),
  exchanges: LIST of LIST (list of cycles of matchmaking result),
  numOfMatchedPairs: INT (number of matched pairs),
  timeElapsed: FLOAT (time elapsed for finalizing exchange in millisecond (ms)),
}
```
## Send Email
Post Request to send emails regarding the match mapping result to the pairs from that date. 
```
POST /sendEmail
```
Body: 
```
{
  dataDate: Data date in %Y/%m/%d format,
}
```
Returns:
```
{
  status: INT (status of the request),
  numberOfSentEmail: INT (number of successfully sent emails)
}
```
## Save Best Result
Post Request, save best matched pairs combination for that particular date. If the date already has a best combination in DB, save the newer one if it is better than one in DB.
```
POST /saveBestResult
```
Body: 
```
{
  dataDate: Data date in %Y/%m/%d format,
  matchedPairs: List of Pairs that gets matched with another pairs
}
```
Returns:
```
{
  status: INT (status of the request),
  message: STRING (what happened to DB (Insert / Update / Not Updating))
}
```
### Get Matched Pairs
Get Request to get the Pairs in that particular date. If date not in db, send status 404.
```
GET /getMatchedPairs
```
Query Parameters: 
```
{
  dataDate: Data date in %Y/%m/%d format
}
```
Returns:
```
{
  status: INT (status of the request),
  matchedPairs: LIST of STRING (list of matched pairs from that date),
  numOfMatchedPairs: INT (number of matched pairs)
}
```
