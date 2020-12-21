from .exchange_algorithm import ExchangeAlgorithm
from .util.sort_cycle_by_priority import edmond_priority_cycle


class EdmondsAlgorithm(ExchangeAlgorithm):
  # benchmark algorithm: Edmond's
  # Inherits from Exchange Algorithm
  def __init__(self, priority_threshold=10):
    super().__init__()

    # add priority_threshold
    #   get cycles only if priority in threshold tolerance
    #   delete otherwise
    self.priority_threshold = priority_threshold


  # Method to finalize exchange of directed graphs
  def finalize_exchange(self, directed_graph):
    cycles = edmond_priority_cycle(directed_graph, self.priority_threshold)
    # Edmond's Algorithm only solves 2 way exchange
    cycles = [cycle for cycle in cycles if (len(cycle) == 2)]
    
    # remove cycles with previous occurring vertices
    assigned = set()
    for cycle in cycles:
      if not ExchangeAlgorithm.element_in_assigned(cycle, assigned):
        self.cycles.append(cycle)

        # add index to assigned
        for index in cycle:
          assigned.add(index)

    self.vertices = directed_graph.get_vertices()
