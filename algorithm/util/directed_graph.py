import pandas as pd
import json

from .constants import *
from .dfs import dfs


class DirectedGraph(object):
  # orientation = list of index adjacency
  def __init__(self, medical_data = pd.DataFrame()):
    # DATAFRAME NEEDED:
    #   - pair num
    #   - donor bloodtype
    #   - recipient bloodtype
    #   - pra
    self.medical_data = medical_data
    self.adjacency = {}
    self.cycles = []
    self.got_cycles = False
    if (not medical_data.empty):
      self.build_graph()

  def build_graph(self):
    for donor_idx, donor_bloodtype, _, _ in self.medical_data.values:
      for recipient_idx, _, recipient_bloodtype, _ in self.medical_data.values:
        if recipient_bloodtype == NO_TYPE:
          continue
        else:
          if (donor_idx != recipient_idx):
            can_donate = blood_type_match[donor_bloodtype][recipient_bloodtype]
            if can_donate:
              # add adjacency
              if (donor_idx in self.adjacency):
                self.adjacency[donor_idx].append(recipient_idx)
              else:
                self.adjacency[donor_idx] = [recipient_idx]

  def sort_adj(self):
    self.adjacency = dict(sorted(self.adjacency.items(), key=lambda x: len(x[1])))
  
  def get_edges(self):
    edge_list = []
    for each_vertices in self.adjacency:
      for each_edge in self.adjacency[each_vertices]:
        edge_list.append([each_vertices, each_edge])

    return edge_list

  def get_vertices(self):
    return self.medical_data["pair_num"].tolist()

  def get_cycles(self):
    if self.got_cycles:
      return self.cycles
    else:
      # search for cycles if it hasn't been searched
      cycles = dfs(self.adjacency)

      self.cycles = cycles
      self.got_cycles = True
      return cycles

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
