from .constants import *
from .dfs import graph_cycle_search


class DirectedGraph(object):
  # orientation = list of index adjacency
  def __init__(self, medical_data):
    # DATAFRAME NEEDED:
    #   - index
    #   - donor bloodtype
    #   - recipient bloodtype
    #   - pra
    self.medical_data = medical_data
    self.adjacency = {}
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

  def get_edge(self, donor_idx, recipient_idx):
    return (recipient_idx in self.adjacency[donor_idx])

  def get_cycles(self):
    cycles = []
    for each_vertices in self.adjacency:
      cycles += graph_cycle_search(self.adjacency, each_vertices, each_vertices, {}, [])

    return cycles