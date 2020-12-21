from .exchange_algorithm import ExchangeAlgorithm


class FirstAcceptNWayExchange(ExchangeAlgorithm):
  # orientation: first come first serve
  # Inherits from Exchange Algorithm
  def __init__(self, n, method):
    super().__init__()

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


  def maximum_method(self, cycles):
    return [cycle for cycle in cycles if (len(cycle) <= self.n)]


  def exact_method(self, cycles):
    return [cycle for cycle in cycles if (len(cycle) == self.n)]


  # Method to finalize exchange of directed graphs
  def finalize_exchange(self, directed_graph):
    cycles = self.method(directed_graph.get_cycles())
    
    # remove cycles with previous occurring vertices
    assigned = set()
    for cycle in cycles:
      if not ExchangeAlgorithm.element_in_assigned(cycle, assigned):
        self.cycles.append(cycle)

        # add index to assigned
        for index in cycle:
          assigned.add(index)

    self.vertices = directed_graph.get_vertices()
