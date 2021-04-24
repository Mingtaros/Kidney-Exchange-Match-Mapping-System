from .util.graph_vis import GraphVisualization
from .util.flatten import flatten


class ExchangeAlgorithm(object):
  # Base Class for Exchange Algorithms
  def __init__(self):
    self.cycles = []
    self.vertices = []


  @staticmethod
  def element_in_assigned(cycle, assigned):
    return any(item in cycle for item in assigned)


  def get_num_of_matched_pairs(self):
    return len(flatten(self.cycles))


  def occuring_cycle_removal(self, cycles):
    # remove cycles with previous occurring vertices
    assigned = set()
    for cycle in cycles:
      if not ExchangeAlgorithm.element_in_assigned(cycle, assigned):
        self.cycles.append(cycle)

        # add index to assigned
        for index in cycle:
          assigned.add(index)


  # Graph Visualization Methods
  def show_donation_mapping_graph(self):
    gv = GraphVisualization()

    # Add vertices
    gv.add_vertices_from(self.vertices)

    # to visualize cycle, add start node as end node
    vis_cycles = [cycle + cycle[:1] for cycle in self.cycles]
    edges = [ed for cycle in vis_cycles for ed in zip(cycle[:-1], cycle[1:])]
    gv.add_edges_from(edges)
    gv.visualize('rb')


  def show_donation_mapping_text(self):
    for cycle in self.cycles:
      print(" --> ".join(map(str, cycle)))


  def show_donation_mapping(self, print_method='text'):
    # print_method:
    #   - "text": print donation mapping as text
    #   - "graph": print reduced graph of donation mapping
    if (print_method == 'text'):
      self.show_donation_mapping_text()
    elif (print_method =='graph'):
      self.show_donation_mapping_graph()
    else:
      raise ValueError("Print method not found, available methods: 'text', 'graph'")
