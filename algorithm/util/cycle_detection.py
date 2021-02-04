def graph_cycle_search(directed_graph, vertex, cycles, visited, finished):
  # Recursive DFS to find all cycle from a vertex
  # WEAKNESS: Python's Recursion Limit
  visited.append(vertex)

  for adjacent_vertex in directed_graph[vertex]:
    # detect cycles
    if adjacent_vertex in visited:
      cycles.append(visited[visited.index(adjacent_vertex):])

    else:
      if ((adjacent_vertex not in visited) and (adjacent_vertex not in finished) and (adjacent_vertex in directed_graph)):
        graph_cycle_search(directed_graph, adjacent_vertex, cycles, visited, finished)

  visited.remove(vertex)
  finished.add(vertex)

  return cycles, visited, finished


def find_all_cycles(directed_graph):
  # Recursive DFS to find all cycle in a directed graph (from all vertices)
  # CALLING graph_cycle_search function for all vertices
  # WEAKNESS: Python's Recursion Limit
  visited = []
  finished = set()
  cycles = []

  for vertex in directed_graph:
    cycle = []
    if (vertex not in visited):
      cycle, visited, finished = graph_cycle_search(directed_graph, vertex, cycle, visited, finished)
      cycles += cycle

  return cycles
