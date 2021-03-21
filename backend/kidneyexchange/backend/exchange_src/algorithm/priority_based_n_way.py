from .exchange_algorithm import ExchangeAlgorithm
from .util.sort_cycle_by_priority import greedy_priority, infrequent_priority


class PriorityBasedNWay(ExchangeAlgorithm):
  # orientation: sort cycles by priority
  # Inherits from Exchange Algorithm
  def __init__(self, n, method, priority='greedy'):
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
      error_message = "Method not found, available methods: 'maximum', 'exact'"
      raise ValueError(error_message)

    # priority -> which gets the higher priority?
    #   - "greedy": cycles with most amount of matches
    #   - "infrequent": cycles with vertices that has least amount of edges
    if (priority == 'greedy'):
      self.priority = greedy_priority
    elif (priority == 'infrequent'):
      self.priority = infrequent_priority
    else:
      error_message = "Priority Method not found, available priorities: 'greedy', 'infrequent'"
      raise ValueError(error_message)


  def maximum_method(self, cycles):
    return [cycle for cycle in cycles if (len(cycle) <= self.n)]


  def exact_method(self, cycles):
    return [cycle for cycle in cycles if (len(cycle) == self.n)]


  # Method to finalize exchange of directed graphs
  def finalize_exchange(self, directed_graph):
    # sort cycles by priority
    sorted_cycles = self.priority(directed_graph)

    # prune if len > n
    cycles = self.method(sorted_cycles)

    self.occuring_cycle_removal(cycles)
    self.vertices = directed_graph.get_vertices()
