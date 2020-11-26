from os import stat


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

  def maximum_method(self, cycles):
    return [cycle for cycle in cycles if (len(cycle) <= self.n)]

  def exact_method(self, cycles):
    return [cycle for cycle in cycles if (len(cycle) == self.n)]

  @staticmethod
  def element_in_assigned(cycle, assigned):
    return any(item in cycle for item in assigned)

  def reduce_graph(self, directed_graph):
    cycles = directed_graph.get_cycles()
    cycles = self.method(cycles)
    
    # remove cycles with previous occurring vertices
    final_cycles = []
    assigned = set()
    for cycle in cycles:
      if not GreedyNWayExchange.element_in_assigned(cycle, assigned):
        final_cycles.append(cycle)

        # add index to assigned
        for index in cycle:
          assigned.add(index)

    return final_cycles
