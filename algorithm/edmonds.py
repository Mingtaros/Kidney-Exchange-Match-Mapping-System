from .exchange_algorithm import ExchangeAlgorithm
from .util.sort_cycle_by_priority import sort_cycle_by_avg_edge_num


class EdmondsAlgorithm(ExchangeAlgorithm):
  # benchmark algorithm: Edmond's
  # Inherits from Exchange Algorithm
  def __init__(self):
    super().__init__()


  # Method to finalize exchange of directed graphs
  def finalize_exchange(self, directed_graph):
    # Edmond's Algorithm only solves 2 way exchange
    cycles = sort_cycle_by_avg_edge_num(directed_graph)
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
