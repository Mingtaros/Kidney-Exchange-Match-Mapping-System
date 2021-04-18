# Final Project Backend
Backend Endpoints for web app in order to access database and match-searching algorithms. Created with Django.

## Get Finalized Exchange
Get Request to get list of cycles given data from a specific date and also the algorithms
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
