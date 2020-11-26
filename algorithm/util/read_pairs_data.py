import numpy as np
import pandas as pd

def read_pairs_data(pairs_filename):
  with open(pairs_filename, 'r') as f:
    pairs_data = f.read()

  pairs_data = pairs_data.split("\n")
  pairs_data = [np.array(data.split("\t")) for data in pairs_data][1:-1]
  
  data = pd.DataFrame(pairs_data, columns=['pair_num', 'donor_bloodtype', 'recipient_bloodtype', 'pra'])
  data['pra'] = pd.to_numeric(data['pra'].replace({'-': '-1'}))
  
  return data