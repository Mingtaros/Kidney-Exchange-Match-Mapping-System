from typing_extensions import final


def sort_cycle_by_cycle_len(directed_graph):
  return sorted(directed_graph.get_cycles(), key=len)


def sort_cycle_by_avg_edge_num(directed_graph):
  adjacency_list = directed_graph.adjacency
  cycles = directed_graph.get_cycles()

  cycle_priority = []
  for cycle in cycles:
    priority = sum([len(adjacency_list[vertex]) for vertex in cycle]) / len(cycle)
    cycle_priority.append((cycle, priority))

  # sort the cycle_priorities
  return sorted(cycle_priority, key=lambda x: x[1])


def edmond_priority_cycle(directed_graph, priority_threshold):
  cycles = sort_cycle_by_avg_edge_num(directed_graph)
  # get cycles with highest priorities (smaller than threshold for edge_num)
  cycles = [cycle for cycle in cycles if (cycle[1] <= priority_threshold)]

  return [cycle for cycle, _ in cycles]
