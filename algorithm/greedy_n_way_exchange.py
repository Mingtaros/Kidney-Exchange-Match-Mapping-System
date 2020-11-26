from util.graph_vis import GraphVisualization

class GreedyNWayExchange(object):
  # orientation: first come first serve
  def __init__(self, n, method):
    self.n = n
    # method:
    #   - "maximum": n as maximum number of edge in cycle
    #   - "exact": n as exact number of edge in cycle
    if (method == 'maximum'):
      self.method = self.maximum_method
    elif (method == 'exact'):
      self.method = self.exact_method
    else:
      raise ValueError("Method not found, available methods: 'maximum', 'exact'")

    self.cycles = []

  def maximum_method(self, cycles):
    return [cycle for cycle in cycles if (len(cycle) <= self.n)]

  def exact_method(self, cycles):
    return [cycle for cycle in cycles if (len(cycle) == self.n)]

  @staticmethod
  def element_in_assigned(cycle, assigned):
    return any(item in cycle for item in assigned)

  def finalize_exchange(self, directed_graph):
    cycles = self.method(directed_graph.get_cycles())
    
    # remove cycles with previous occurring vertices
    assigned = set()
    for cycle in cycles:
      if not GreedyNWayExchange.element_in_assigned(cycle, assigned):
        self.cycles.append(cycle)

        # add index to assigned
        for index in cycle:
          assigned.add(index)

  def show_donation_mapping_graph(self):
    gv = GraphVisualization()

    # to visualize cycle, add start node as end node
    vis_cycles = [cycle + cycle[:1] for cycle in self.cycles]
    edges = [ed for cycle in vis_cycles for ed in zip(cycle[:-1], cycle[1:])]
    for edge in edges:
      gv.add_edge(edge[0], edge[1])

    gv.visualize()

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
