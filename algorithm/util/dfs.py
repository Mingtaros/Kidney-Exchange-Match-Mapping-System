def graph_cycle_search(directed_graph, start, current_node, visited, list_of_visited):
  if ((current_node in visited) and (visited[current_node])):
    if (current_node == start):
      # yield result
      yield [*list_of_visited]
  else:
    visited[current_node] = True
    list_of_visited.append(current_node)
    if (current_node in directed_graph):
      for child in directed_graph[current_node]:
        yield from graph_cycle_search(directed_graph, start, child, visited, list_of_visited)
    
    list_of_visited.remove(current_node)
    visited[current_node] = False