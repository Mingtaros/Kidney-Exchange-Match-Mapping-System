from .exchange_algorithm import ExchangeAlgorithm
from .util.sort_cycle_by_priority import sort_cycle_by_avg_edge_num


class PriorityBasedNWay(ExchangeAlgorithm):
  # orientation: sort cycles by priority
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
    # sort cycles by priority
    sorted_cycles = sort_cycle_by_avg_edge_num(directed_graph)
    cycles = [cycle for cycle, _ in sorted_cycles]
    # prune if len > n
    cycles = self.method(cycles)

    self.occuring_cycle_removal(cycles)
    self.vertices = directed_graph.get_vertices()
