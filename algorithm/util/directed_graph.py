import pandas as pd
import json

from .constants import *
from .cycle_detection import find_all_cycles


class DirectedGraph(object):
  # orientation = list of pair_number adjacency
  def __init__(self, medical_data = pd.DataFrame()):
    # DATAFRAME NEEDED:
    #   - pair_num
    #   - donor_bloodtype
    #   - recipient_bloodtype
    #   - pra
    if (medical_data.empty):
      raise AttributeError("Medical Data is Empty.")

    self.medical_data = medical_data
    self.adjacency = {}
    self.build_graph()
    self.cycles = find_all_cycles(self.adjacency)


  def build_graph(self):
    # initialize adjacency matrix with empty lists
    self.adjacency = {pair_idx: [] for pair_idx in self.medical_data['pair_num'].values}

    # iterate through data to find donor projection between 2 pairs for every pair 
    for donor_idx, donor_bloodtype, _, _ in self.medical_data.values:
      for recipient_idx, _, recipient_bloodtype, _ in self.medical_data.values:
        if recipient_bloodtype == NO_TYPE:
          continue
        else:
          if (donor_idx != recipient_idx):
            can_donate = blood_type_match[donor_bloodtype][recipient_bloodtype]
            if can_donate:
              # add adjacency
              self.adjacency[donor_idx].append(recipient_idx)


  def get_adjacency_list(self):
    return self.adjacency
  
  
  def get_edges(self):
    edge_list = []
    for each_vertices in self.adjacency:
      for each_edge in self.adjacency[each_vertices]:
        edge_list.append([each_vertices, each_edge])

    return edge_list


  def get_vertices(self):
    return self.medical_data["pair_num"].tolist()


  def get_cycles(self):
    return self.cycles


  def save_data(self, directory):
    data = {
      "adjacency": self.adjacency,
      "cycles": self.cycles,
      "medical_data": str(self.medical_data)
    }

    with open(directory, 'w') as f:
      json.dump(data, f)
      print("Data saved at", directory)


  def load_graph_from_data(self, directory):
    with open(directory, 'r') as f:
      data = json.load(f)
    
    self.medical_data = data['medical_data']
    self.adjacency = data['adjacency']
    self.cycles = data['cycles']
    if (self.cycles):
      self.got_cycles = True
