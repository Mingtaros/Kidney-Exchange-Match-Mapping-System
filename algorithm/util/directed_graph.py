from .constants import *
from .dfs import graph_cycle_search


class DirectedGraph(object):
  # orientation = list of index adjacency
  def __init__(self, medical_data):
    # DATAFRAME NEEDED:
    #   - pair num
    #   - donor bloodtype
    #   - recipient bloodtype
    #   - pra
    self.medical_data = medical_data
    self.adjacency = {}
    self.cycles = []
    self.got_cycles = False
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
      cycles = []
      for each_vertices in self.adjacency:
        cycles += graph_cycle_search(self.adjacency, each_vertices, each_vertices, {}, [])

      self.cycles = cycles
      self.got_cycles = True
      return cycles
